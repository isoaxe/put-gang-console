import admin from "firebase-admin";
import { addMonth, currentMonthKey, chartExists, initChartData } from "./../util/helpers.js";
import { storeProfilePic } from "./instagramAvatar.js";
import { ADMIN_EMAIL, ADMIN_UID } from "./../util/constants.js";


// Create new user.
export async function create (req, res) {
	try {
		// Declare variables from params and body.
		let { refId, membLvl } = req.params;
		const { email, password } = req.body;
		if (membLvl === "null") membLvl = "none";

		// Initialize Firestore database and paths.
		const db = admin.firestore();
		const usersPath = db.collection("users");
		const paymentsPath = db.collection("payments");
		const statsPath = db.collection("stats");
		const chartsPath = db.collection("charts");

		// Iterate chart data tracking number of paying subscribers.
		if (membLvl !== "none") {
			const key = currentMonthKey();
			const exists = await chartExists(key);
			if (!exists) {
				initChartData();
			}
			const chartsRef = chartsPath.doc(key);
			const charts = await chartsRef.get();
			let { joined } = charts.data();
			joined++;
			chartsRef.set({ joined }, { merge: true });
		}

		// Get all uids and check if refId is amongst them.
		// If present, set uplineUid and uplineRole based on this.
		let uplineUid = "";
		let uplineRole = "";
		const ids = [];
		const userList = await admin.auth().listUsers();
		userList.users.forEach(item => ids.push(item.uid));
		if (ids.includes(refId)) {
			uplineUid = refId; // As refId has been validated.
			const uplineDocRef = usersPath.doc(uplineUid);
			const uplineDoc = await uplineDocRef.get();
			uplineRole = uplineDoc.data().role;
		}

		// Set user role.
		let role;
		if (email === ADMIN_EMAIL) {
			role = "admin";
		} else if (uplineRole === "level-2") {
			role = "level-3";
		} else if (uplineRole === "level-1") {
			role = "level-2";
		} else if (uplineRole === "admin") {
			role = "level-1";
		} else {
			role = "standard"; // Assigned if referrer is invalid or empty.
		}

		// Set creation and expiry dates.
		const now = new Date();
		const joinDate = now.toISOString();
		const expiryDate = addMonth(now).toISOString();

		// Track if customer is recurring and has paid at least once.
		const subscribed = false;

		// Create user and set their claims.
		const { uid } = await admin.auth().createUser({ email, password });
		await admin.auth().setCustomUserClaims(uid, { role, subscribed });

		// Not all required user data can be stored by auth. Use Firestore instead.
		const user = usersPath.doc(uid);
		await user.set({
			uid,
			email,
			role,
			membLvl,
			joinDate,
			expiryDate,
			receiptId: 1,
			name: ""
		});

		// Initialize a level2Uids array if admin. Used to reduce cost of getting payments data.
		if (role === "admin") {
			await user.set({ level2Uids: [], expiryDate: "" }, { merge: true });
		}

		// Initialize a downlineUids array and activityId if senior user.
		if (["admin", "level-1", "level-2"].includes(role)) {
			await user.set({ downlineUids: [], activityId: 0 }, { merge: true });
		}

		if (["level-1", "level-2", "level-3"].includes(role)) {
			// Add new user to downlineUids array of the referrer.
			const uplineDocRef = usersPath.doc(uplineUid);
			const uplineDoc = await uplineDocRef.get();
			const referrerDownlines = uplineDoc.data().downlineUids;
			referrerDownlines.push(uid);
			uplineDocRef.set({ downlineUids: referrerDownlines }, { merge: true });

			// Only initialize uplineUid for below users.
			user.set({ uplineUid }, { merge: true });
		}

		// Add user to level2Uids array of admin.
		if (role === "level-2") {
			const adminDocRef = usersPath.doc(ADMIN_UID);
			const adminDoc = await adminDocRef.get();
			const level2Uids = adminDoc.data().level2Uids;
			level2Uids.push(uid);
			adminDocRef.set({ level2Uids }, { merge: true });
		}

		// Add a receipt to payments to indicate that a user has joined.
		const receipt = {
			name: "",
			uid,
			email,
			date: joinDate,
			action: "join",
			product: membLvl,
			sale: 0,
		}

		// Save receipts to Firestore with the document name of receiptId.
		const receipts = paymentsPath.doc(uid).collection("receipts").doc("1");
		receipts.set(receipt);

		// Initialize the stats totals for admin user.
		const stats = statsPath.doc(uid);
		if (role === "admin") {
			const [totalRevenue, totalMrr] = Array(2).fill(0);
			await stats.set({
				totalRevenue,
				totalMrr
			});
		}

		// Initialize all stats. These data relate to the user's earnings from their downline.
		if (["admin", "level-1", "level-2"].includes(role)) {
			const [revenue, mrr, paid, unpaid, sales, invoiceId] = Array(6).fill(0);
			stats.set({
				uid,
				email,
				revenue,
				mrr,
				paid,
				unpaid,
				sales,
				invoiceId
			}, { merge: true });
		}

		return res.status(200).send({ message: `${role} user created for ${email}` });
	} catch (err) {
		return handleError(res, err);
	}
}


// Edit a user in Firestore.
export async function edit (req, res) {
	try {
		const { uid } = res.locals;
		const { name, insta } = req.body;
		const db = admin.firestore();
		const usersPath = db.collection("users");

		// Set name or insta handle in Firestore user data.
		const userRef = usersPath.doc(uid);
		await userRef.set(req.body, { merge: true} );

		// Set name in Firebase auth.
		if (name) {
			admin.auth().updateUser(uid, { displayName: name });
		}

		// Set photo url in Firebase auth and Firestore.
		if (insta) {
			const url = await storeProfilePic(insta);
			if (url) {
				admin.auth().updateUser(uid, { photoURL: url });
				userRef.set({ avatarUrl: url }, { merge: true });
				return res.status(200).send({ message: "User successfully edited." });
			} else {
				console.log("not found");
				return res.status(404).end("not found");
			}
		}
	} catch (err) {
		return handleError(res, err);
	}
}


// Returns an array of all user data.
export async function all (req, res) {
	try {
		const { role, uid } = res.locals;
		const db = admin.firestore();
		const usersPath = db.collection("users");
		const users = [];
		let uids = [uid];

		const listAuthUsers = await admin.auth().listUsers();
		const allAuthUsers = listAuthUsers.users;

		// Get data for all users if admin.
		if (role === "admin") {
			const usersRef = await usersPath.get();
			usersRef.forEach(user => {
				const data = user.data();
				const matchUser = allAuthUsers.find(item => item.uid === data.uid);
				const lastSignIn = matchUser.metadata.lastSignInTime;
				data["lastSignIn"] = lastSignIn;
				users.push(data);
			});
		}

		// Get uids of downlines for level-1 and level-2 users.
		if (role === "level-1" || role === "level-2") {
			const currentUserRef = await usersPath.doc(uid).get();
			const downlineUids = currentUserRef.data().downlineUids;
			uids = uids.concat(downlineUids);
			// Get uids of the downline's downlines for level-1 users.
			if (role === "level-1") {
				for (let i = 0; i < downlineUids.length; i++) {
					const downlineUserRef = await usersPath.doc(downlineUids[i]).get();
					const bottomlineUids = downlineUserRef.data().downlineUids;
					uids = uids.concat(bottomlineUids);
				}
			}
		}

		// Add data for self and all downlines if level-1 or level-2 user.
		if (role === "level-1" || role === "level-2") {
			const usersRef = await usersPath.where("uid", "in", uids).get();
			usersRef.forEach(user => {
				const data = user.data();
				const matchUser = allAuthUsers.find(item => item.uid === data.uid);
				const lastSignIn = matchUser.metadata.lastSignInTime;
				data["lastSignIn"] = lastSignIn;
				users.push(data);
			});
		}

		return res.status(200).send(users);
	} catch (err) {
		return handleError(res, err);
	}
}


// Return the calling users data from Firestore as an object.
export async function user (req, res) {
	try {
		const { uid } = res.locals;
		const db = admin.firestore();
		const usersPath = db.collection("users");

		const userRef = await usersPath.doc(uid).get();
		const userData = userRef.data();

		return res.status(200).send(userData);
	} catch (err) {
		return handleError(res, err);
	}
}


// Standard error helper function.
function handleError (res, err) {
	return res.status(500).send({ error: `${err}` });
}

import admin from "firebase-admin";
import { addMonth } from "./../util/helpers.js";
import { ADMIN_EMAIL, ADMIN_UID } from "./../util/constants.js";


// Create new user.
export async function create (req, res) {
	try {
		// Check Firestore for referrer id param and set uplineUid based on this.
		let uplineUid = "";
		let uplineRole = "";
		const { refId, membLvl } = req.params;
		const { email, password } = req.body;
		const db = admin.firestore();
		const usersPath = db.collection("users");
		const paymentsPath = db.collection("payments");
		const idList = await usersPath.listDocuments();
		const ids = idList.map(doc => doc.id);
		if (ids.includes(refId)) {
			uplineUid = refId; // As refId has been validated.
			const uplineDocRef = await usersPath.doc(uplineUid);
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
		user.set({
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
			user.set({ level2Uids: [] }, { merge: true });
		}

		// Initialize a downlineUids array and activityId if senior user.
		if (["admin", "level-1", "level-2"].includes(role)) {
			user.set({ downlineUids: [], activityId: 0 }, { merge: true });
		}

		if (["level-1", "level-2", "level-3"].includes(role)) {
			// Add new user to downlineUids array of the referrer.
			const uplineDocRef = await usersPath.doc(uplineUid);
			const uplineDoc = await uplineDocRef.get();
			const referrerDownlines = uplineDoc.data().downlineUids;
			referrerDownlines.push(uid);
			uplineDocRef.set({ downlineUids: referrerDownlines }, { merge: true });

			// Only initialize uplineUid for below users.
			user.set({ uplineUid }, { merge: true });
		}

		// Add user to level2Uids array of admin.
		if (role === "level-2") {
			const adminDocRef = await usersPath.doc(ADMIN_UID);
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

		return res.status(200).send({ message: `${role} user created for ${email}` });
	} catch (err) {
		return handleError(res, err);
	}
}


// Returns a list of all users.
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

		return res.status(200).send(users);
	} catch (err) {
		return handleError(res, err);
	}
}


// Helper function to create object containing user data.
function mapUser (user) {
	const customClaims = (user.customClaims || { role: "" });
	const role = customClaims.role;
	return {
		uid: user.uid,
		email: user.email || "",
		displayName: user.displayName || "",
		role,
		lastSignInTime: user.metadata.lastSignInTime,
		creationTime: user.metadata.creationTime.slice(5, 16)
	};
}


// Standard error helper function.
function handleError (res, err) {
	return res.status(500).send({ error: `${err}` });
}

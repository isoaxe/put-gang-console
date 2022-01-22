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
			activityId: 0,
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

		if (role !== "admin" && role !== "standard") {
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

		return res.status(200).send({ message: `${role} user created for ${email}` });
	} catch (err) {
		return handleError(res, err);
	}
}


// Returns a list of all users.
export async function all (req, res) {
	try {
		const listUsers = await admin.auth().listUsers();
		const allUsers = listUsers.users.map(mapUser);

		return res.status(200).send(allUsers);
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

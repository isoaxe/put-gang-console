import admin from "firebase-admin";


// Create new user.
export async function create (req, res) {
	try {
		// Check Firestore for referrer id param and set uplineUid based on this.
		let uplineUid = "";
		let uplineRole = "";
		const { refId, membLvl } = req.params;
		const db = admin.firestore();
		const idList = await db.collection("users").listDocuments();
		const ids = idList.map(doc => doc.id);
		if (ids.includes(refId)) {
			uplineUid = refId; // As refId has been validated.
			const refDoc = db.collection("users").doc(refId);
			uplineRole = refDoc.role;
		} else { // If referrer id is invalid or empty.
			uplineUid = "S9yKLsU2YtQHwly9jkFZNgdismQ2"; // Uid of admin user.
		}

		/* TODO: Add new user to downlineUids array of the referrer. */

		// Set user role.
		let role;
		const { email, password } = req.body;
		if (email === "phillymantis@gmail.com") {
			role = "admin";
		} else if (uplineRole === "level-1") {
			role = "level-2";
		} else {
			role = "level-1"; // Assigned if referrer is invalid or empty.
		}

		const { uid } = await admin.auth().createUser({
			email,
			password
		});

		await admin.auth().setCustomUserClaims(uid, { role });

		// Not all required user data can be stored by auth. Use Firestore instead.
		const user = db.collection("users").doc(uid);
		user.set({
			uid,
			email,
			role,
			uplineUid,
			downlineUids: []
		});

		return res.status(200).send({ message: `${role} user created` });
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
	const customClaims = (user.customClaims || { role: "", businessId: "" });
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

import admin from "firebase-admin";
import { filterObject } from "./../util/helpers.js";
import { ADMIN_UID } from "./../util/constants.js";


// Create a new activity.
export async function create (req, res) {
	try {
		const { uid, email } = res.locals;
		const { action, product } = req.params;
		const db = admin.firestore();

		// Get current user data.
		const userRef = await db.collection("users").doc(uid).get();
		const userData = userRef.data();

		// Get activityId from admin data and increment.
		const adminUser = db.collection("users").doc(ADMIN_UID);
		const adminRef = await adminUser.get();
		const adminData = adminRef.data();
		let { activityId } = adminData;
		activityId++;
		adminUser.set({ activityId }, { merge: true });

		// Add current timestamp.
		const now = new Date();
		const date = now.toISOString();

		// Save activity data to Firestore.
		const activity = db.collection("activity").doc(activityId.toString());
		activity.set({
			uid,
			name: userData.name,
			email,
			product,
			action,
			date
		});

		return res.status(200).send({ message: `${email} has taken a ${action} action on ${product}` });
	} catch (err) {
		return handleError(res, err);
	}
}


// Get all activity applicable to the calling user.
export async function all (req, res) {
	try {
		const { uid, role } = res.locals;
		const db = admin.firestore();
		let uids = [];

		// Get current user data.
		const userRef = await db.collection("users").doc(uid).get();
		const userData = userRef.data();

		// Get activity id from admin data.
		const adminRef = await db.collection("users").doc(ADMIN_UID).get();
		const adminData = adminRef.data();
		const { activityId } = adminData;

		// Populate activities object from Firestore.
		let activities = {};
		for (let i = 1; i <= activityId; i++) {
			const activityNumber = i.toString();
			const activityRef = await db.collection("activity").doc(activityNumber).get();
			const activity = activityRef.data();
			activities[activityNumber] = activity;
		}

		// Include self, downline and downlines' downline for level-1 user.
		if (role === "level-1") {
			const downUids = userData.downlineUids;
			uids = downUids;
			for (let i = 0; i < downUids.length; i++) {
				const downUserRef = await db.collection("users").doc(downUids[i]).get();
				const downUserData = downUserRef.data();
				uids = uids.concat(downUserData.downlineUids);
			}
			uids.push(uid);
		}

		// Include self and downline for level-2 user.
		if (role === "level-2") {
			uids = userData.downlineUids;
			uids.push(uid);
		}

		// Filter the activities array based on authorized uids.
		// Admin user gets unfiltered object (i.e. all activities).
		if (role !== "admin") {
			activities = filterObject(activities, uids, "uid");
		}

		return res.status(200).send(activities);
	} catch (err) {
		return handleError(res, err);
	}
}


// Standard error helper function.
function handleError (res, err) {
	return res.status(500).send({ error: `${err}` });
}

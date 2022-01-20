import admin from "firebase-admin";
import { filterObject } from "./../util/helpers.js";
import { ADMIN_UID } from "./../util/constants.js";


// Create a new activity.
export async function create (req, res) {
	try {
		const { uid, role, email } = res.locals;
		const { action, product } = req.params;
		const db = admin.firestore();

		// Get current user data.
		const userRef = await db.collection("users").doc(uid).get();
		const userData = userRef.data();

		// Get activityId from admin data and increment.
		const adminUser = db.collection("users").doc(ADMIN_UID);
		const adminRef = await adminUser.get();
		const adminData = adminRef.data();
		let adminActivityId = adminData.activityId;
		adminActivityId++;
		adminUser.set({ activityId: adminActivityId }, { merge: true });

		// Declare variables before conditionals.
		let uplineData;

		// Get activityId from upline data and increment.
		if (role === "level-2" || role === "level-3") {
			const uplineUser = db.collection("users").doc(userData.uplineUid);
			const uplineRef = await uplineUser.get();
			uplineData = uplineRef.data();
			let uplineActivityId = uplineData.activityId;
			uplineActivityId++;
			uplineUser.set({ activityId: uplineActivityId }, { merge: true });
		}

		// Get activityId from topline data and increment.
		if (role === "level-3") {
			const toplineUser = db.collection("users").doc(uplineData.uplineUid);
			const toplineRef = await toplineUser.get();
			const toplineData = toplineRef.data();
			let toplineActivityId = toplineData.activityId;
			toplineActivityId++;
			toplineUser.set({ activityId: toplineActivityId }, { merge: true });
		}

		// Add current timestamp.
		const now = new Date();
		const date = now.toISOString();

		// Declare activity data as variable.
		const activityData = {
			uid,
			name: userData.name,
			email,
			product,
			action,
			date
		}

		// Save activity data for consumption by admin.
		const adminActivity = db.collection("activity").doc(ADMIN_UID).collection("admin");
		const adminActivityRef = adminActivity.doc(adminActivityId.toString());
		adminActivityRef.set(activityData);

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

		// Populate activities object from Firestore.
		let activities = {};
		const activitiesRef = await db.collection("activity").get();
		activitiesRef.forEach(activity => {
			activities[activity.id] = activity.data();
		});

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

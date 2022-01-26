import admin from "firebase-admin";
import { ADMIN_UID } from "./../util/constants.js";


// Create a new activity.
export async function create (req, res) {
	try {
		const { uid, role, email } = res.locals;
		const { action, product } = req.params;
		const db = admin.firestore();
		const activityPath = db.collection("activity");
		const usersPath = db.collection("users");

		// Get current user data.
		const userRef = await usersPath.doc(uid).get();
		const userData = userRef.data();

		// Get activityId from admin data and increment.
		const adminUser = usersPath.doc(ADMIN_UID);
		const adminRef = await adminUser.get();
		const adminData = adminRef.data();
		let adminActivityId = adminData.activityId;
		adminActivityId++;
		adminUser.set({ activityId: adminActivityId }, { merge: true });

		// Declare variables before conditionals.
		let uplineData, uplineActivityId, toplineActivityId;

		// Get activityId from upline data and increment.
		if (role === "level-2" || role === "level-3") {
			const uplineUser = usersPath.doc(userData.uplineUid);
			const uplineRef = await uplineUser.get();
			uplineData = uplineRef.data();
			uplineActivityId = uplineData.activityId;
			uplineActivityId++;
			uplineUser.set({ activityId: uplineActivityId }, { merge: true });
		}

		// Get activityId from topline data and increment.
		if (role === "level-3") {
			const toplineUser = usersPath.doc(uplineData.uplineUid);
			const toplineRef = await toplineUser.get();
			const toplineData = toplineRef.data();
			toplineActivityId = toplineData.activityId;
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
		const adminActivity = activityPath.doc(ADMIN_UID).collection("admin");
		const adminActivityRef = adminActivity.doc(adminActivityId.toString());
		adminActivityRef.set(activityData);

		// Save activity data for consumption by level-1.
		if (role === "level-2") {
			const level1Activity = activityPath.doc(uplineData.uid).collection("level-1");
			const level1ActivityRef = level1Activity.doc(uplineActivityId.toString());
			level1ActivityRef.set(activityData);
		}

		// Save activity data for consumption by level-1 and level-2.
		if (role === "level-3") {
			const level1Activity = activityPath.doc(uplineData.uplineUid).collection("level-1");
			const level1ActivityRef = level1Activity.doc(toplineActivityId.toString());
			level1ActivityRef.set(activityData);

			const level2Activity = activityPath.doc(uplineData.uid).collection("level-2");
			const level2ActivityRef = level2Activity.doc(uplineActivityId.toString());
			level2ActivityRef.set(activityData);
		}

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
		let activities = [];

		// Populate activities object from Firestore.
		const activityRef = await db.collection("activity").doc(uid).collection(role).get();
		activityRef.forEach(activity => {
			activities.push(activity.data());
		});

		return res.status(200).send(activities);
	} catch (err) {
		return handleError(res, err);
	}
}


// Standard error helper function.
function handleError (res, err) {
	return res.status(500).send({ error: `${err}` });
}

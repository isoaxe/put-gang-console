import admin from "firebase-admin";
import { createActivity } from "./../util/helpers.js";


// Create a new activity.
export async function create (req, res) {
	try {
		const { uid, role, email } = res.locals;
		const { action, product } = req.params;

		await createActivity(uid, role, email, action, product);

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

		// Sort activities by date in descending order.
		activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		return res.status(200).send(activities);
	} catch (err) {
		return handleError(res, err);
	}
}


// Standard error helper function.
function handleError (res, err) {
	return res.status(500).send({ error: `${err}` });
}

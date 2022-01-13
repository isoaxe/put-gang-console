import admin from "firebase-admin";
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

		const adminRef = await db.collection("users").doc(ADMIN_UID).get();
		const adminData = adminRef.data();
		let { activityId } = adminData;
		activityId++;

		return res.status(200).send({ message: "placeholder message" });
	} catch (err) {
		return handleError(res, err);
	}
}


// Get all activity applicable to the calling user.
export async function all (req, res) {
	try {
		return res.status(200).send({ message: "placeholder message"});
	} catch (err) {
		return handleError(res, err);
	}
}


// Standard error helper function.
function handleError (res, err) {
	return res.status(500).send({ error: `${err}` });
}

import admin from "firebase-admin";


// Create a new activity.
export async function create (req, res) {
	try {
		const { uid, role, email } = res.locals;
		const { action, product } = req.params;
		const db = admin.firestore();

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

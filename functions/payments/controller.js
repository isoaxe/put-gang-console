import admin from "firebase-admin";


// Initialize payments for new user.
export async function init (req, res) {
	try {
		const { uid } = req.params;
		const { email } = req.body;
		const db = admin.firestore();
		const user = db.collection("payments").doc(uid);

		// Initialize all stats.
		const stats = user.collection("stats").doc("stats");
		const [revenue, paid, unpaid, joinSold, watchSold] = Array(5).fill(0);
		stats.set({
			name: "",
			email,
			revenue,
			paid,
			unpaid,
			joinSold,
			watchSold
		});

		return res.status(200).send({ message: "Payments initialized for new user" });
	} catch (err) {
		return handleError(res, err);
	}
}


// Create a new payment.
export async function create (req, res) {
	try {
		const { uid, type } = req.params;
		const { name, email } = req.body;
		const db = admin.firestore();
		const user = db.collection("payments").doc(uid);

		return res.status(200).send({ message: `${type} payment made` });
	} catch (err) {
		return handleError(res, err);
	}
}


// Returns all payment data.
export async function all (req, res) {
	try {
		return res.status(200).send("Temp placeholder for payment data");
	} catch (err) {
		return handleError(res, err);
	}
}


// Standard error helper function.
function handleError (res, err) {
	return res.status(500).send({ error: `${err}` });
}

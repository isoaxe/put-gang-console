import admin from "firebase-admin";
import { ADMIN_UID } from "./../util/constants.js";


// Initialize payments for new user.
export async function init (req, res) {
	try {
		const { uid } = req.params;
		const { email } = req.body;
		const db = admin.firestore();
		const user = db.collection("payments").doc(uid);

		// Initialize all stats.
		const stats = user.collection("stats").doc("stats");
		// These data relate to the user's earnings from their downline.
		const [revenue, paid, unpaid, sales] = Array(4).fill(0);
		stats.set({
			name: "",
			email,
			revenue,
			paid,
			unpaid,
			sales
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

		// Get current user data.
		const userRef = await db.collection("users").doc(uid).get();
		const userData = userRef.data();
		const role = userData.role;

		// Get admin stats as payments from all users will accrue here.
		const adminUid = ADMIN_UID;
		const adminUser = db.collection("payments").doc(adminUid);
		const adminStats = adminUser.collection("stats").doc("stats");
		const adminStatsRef = await adminStats.get();
		const adminStatsData = adminStatsRef.data();
		let adminRevenue = adminStatsData.revenue;
		let adminUnpaid = adminStatsData.unpaid;
		let adminSales = adminStatsData.sales;

		// Get upline stats. Same as admin if level-1 user.
		const uplineUid = userData.uplineUid;
		const upline = db.collection("payments").doc(uplineUid);
		const uplineStats = upline.collection("stats").doc("stats");
		const uplineStatsRef = await uplineStats.get();
		const uplineStatsData = uplineStatsRef.data();
		let uplineRevenue = uplineStatsData.revenue;
		let uplineUnpaid = uplineStatsData.unpaid;
		let uplineSales = uplineStatsData.sales;

		// Initialize variables for use below.
		let toplineRevenue, toplineUnpaid, toplineSales, toplineStats;

		// Get the upline's upline (will be level-1) for level-3 users.
		if (role === "level-3") {
			// Get upline user data.
			const uplineRef = await db.collection("users").doc(uplineUid).get();
			const uplineData = uplineRef.data();

			// Get topline stats. Will be level-1 user.
			const toplineUid = uplineData.uplineUid; // The upline's upline.
			const topline = db.collection("payments").doc(toplineUid);
			toplineStats = topline.collection("stats").doc("stats");
			const toplineStatsRef = await toplineStats.get();
			const toplineStatsData = toplineStatsRef.data();
			toplineRevenue = toplineStatsData.revenue;
			toplineUnpaid = toplineStatsData.unpaid;
			toplineSales = toplineStatsData.sales;
		}

		// Set value of payment type.
		let value;
		if (type === "join") value = 50;
		if (type === "watch") value = 150;

		// Admin revenue and sales will always increase by full amount.
		// This covers level-1 users.
		adminRevenue += value;
		adminSales++;
		adminStats.set({
			revenue: adminRevenue,
			sales: adminSales
		}, { merge: true });

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

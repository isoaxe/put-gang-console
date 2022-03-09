import admin from "firebase-admin";
import { newSubscriber, recurringPayment } from "./../util/helpers.js";
import { ADMIN_UID } from "./../util/constants.js";


// Create a new payment.
export async function create (req, res) {
	try {
		const { uid, role, subscribed, email } = res.locals;
		const { type } = req.params;
		const db = admin.firestore();
		const statsPath = db.collection("stats");

		// Check if user is a new subscriber.
		const newSub = newSubscriber(subscribed, type);

		// Get current user data.
		const usersPath = db.collection("users");
		const userRef = await usersPath.doc(uid).get();
		const userData = userRef.data();

		// Get admin stats as payments from all users will accrue here.
		const adminStats = statsPath.doc(ADMIN_UID);
		const adminStatsRef = await adminStats.get();
		const adminStatsData = adminStatsRef.data();
		let { totalMrr } = adminStatsData;
		let adminMrr = adminStatsData.mrr;

		// Initialize variables for use below.
		let uplineUid, uplineMrr, uplineStats;

		// Get upline stats. Same as admin if level-1 user.
		if (["level-1", "level-2", "level-3"].includes(role)) {
			uplineUid = userData.uplineUid;
			uplineStats = statsPath.doc(uplineUid);
			const uplineStatsRef = await uplineStats.get();
			const uplineStatsData = uplineStatsRef.data();
			uplineMrr = uplineStatsData.mrr;
		}

		// Initialize variables for use below.
		let toplineMrr, toplineStats;

		// Get the upline's upline (will be level-1) for level-3 users.
		if (role === "level-3") {
			// Get upline user data.
			const uplineRef = await usersPath.doc(uplineUid).get();
			const uplineData = uplineRef.data();

			// Get topline stats. Will be level-1 user.
			const toplineUid = uplineData.uplineUid; // The upline's upline.
			toplineStats = statsPath.doc(toplineUid);
			const toplineStatsRef = await toplineStats.get();
			const toplineStatsData = toplineStatsRef.data();
			toplineMrr = toplineStatsData.mrr;
		}

		// Set value of payment type.
		let value;
		if (type === "join") value = 150;
		if (type === "watch") value = 50;

		// Add to admin MRR if new subscriber and not admin.
		if (newSub && role !== "admin") {
			totalMrr += value;
			if (role === "level-2" || role === "level-3") adminMrr += value / 2;
			if (role === "level-1" || role === "standard") adminMrr += value;
		}

		// Admin sales will always increment for all users.
		// The amount of revenue accruing to admin depends on user role.
		// This covers level-1 and standard users fully.
		adminStats.set({
			totalMrr,
			mrr: adminMrr
		}, { merge: true });

		// Set stats for level-1 if level-2 user.
		if (role === "level-2") {
			if (newSub) uplineMrr += value / 2;
			uplineStats.set({
				mrr: uplineMrr
			}, { merge: true });
		}

		// Set stats for level-1 and level-2 if level-3 user.
		if (role === "level-3") {
			if (newSub) {
				uplineMrr += value / 4;
				toplineMrr += value / 4;
			}
			toplineStats.set({
				mrr: toplineMrr
			}, { merge: true });

			uplineStats.set({
				mrr: uplineMrr
			}, { merge: true });
		}

		if (newSub) await admin.auth().setCustomUserClaims(uid, { role, subscribed: true });

		recurringPayment(uid, role, email, type);

		return res.status(200).send({ message: `${email} has made a ${type} payment` });
	} catch (err) {
		return handleError(res, err);
	}
}


// Returns statistics for user and their downlines.
export async function stats (req, res) {
	try {
		const { uid, role } = res.locals;

		// Database and path variables.
		const db = admin.firestore();
		const usersPath = db.collection("users");
		const statsPath = db.collection("stats");

		// Get current user data.
		const userRef = await usersPath.doc(uid).get();
		const userData = userRef.data();

		// Variables used within conditionals below.
		let uids = [];
		const stats = [];

		// Get level-1, level-2 and self for admin.
		if (role === "admin") {
			uids = userData.downlineUids.concat(userData.level2Uids);
			uids.push(uid);
		}

		// Include downline and self for level-1 user.
		if (role === "level-1") {
			uids = userData.downlineUids;
			uids.push(uid);
		}

		// Only include self for level-2 user.
		if (role === "level-2") {
			uids.push(uid);
		}

		// Populate stats array.
		const statsRef = await statsPath.where("uid", "in", uids).get();
		statsRef.forEach(userStats => {
			const data = userStats.data();
			stats.push(data);
		});

		return res.status(200).send(stats);
	} catch (err) {
		return handleError(res, err);
	}
}


// Returns invoices for selected user as specified by params.
export async function invoices (req, res) {
	try {
		const { uid } = req.params; // NOT calling user's id.
		const db = admin.firestore();
		const invoices = [];

		// Get all invoices for given user id.
		const paymentsPath = db.collection("payments");
		const invoicesRef = await paymentsPath.doc(uid).collection("invoices").get();
		invoicesRef.forEach(invoice => {
			invoices.push(invoice.data());
		});

		return res.status(200).send(invoices);
	} catch (err) {
		return handleError(res, err);
	}
}


// Returns receipts for selected user as specified by params.
export async function receipts (req, res) {
	try {
		const { uid } = req.params; // NOT calling user's id.
		const db = admin.firestore();
		const receipts = [];

		// Get all receipts for given user id.
		const paymentsPath = db.collection("payments");
		const receiptsRef = await paymentsPath.doc(uid).collection("receipts").get();
		receiptsRef.forEach(receipt => {
			receipts.push(receipt.data());
		});

		return res.status(200).send(receipts);
	} catch (err) {
		return handleError(res, err);
	}
}


// Standard error helper function.
function handleError (res, err) {
	return res.status(500).send({ error: `${err}` });
}

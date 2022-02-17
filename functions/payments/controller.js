import admin from "firebase-admin";
import fetch from "node-fetch";
import { newSubscriber, currentMonthKey, chartExists, initChartData } from "./../util/helpers.js";
import { ADMIN_UID, STRIPE_API } from "./../util/constants.js";


// Make a payment via Stripe.
export async function stripe (req, res, next) {
	try {
		const secret = process.env.STRIPE_SECRET_KEY_TEST;
		// secret only works in prod. Is undefined in dev. Insta env vars are fine...
		const fetchConfig = {
			method: "GET",
			headers: {
				authorization: `Bearer ${secret}`,
				"Content-Type": "application/x-www-form-urlencoded",
				"Accept": "*/*"
			},
		};
		let response = await fetch(`${STRIPE_API}/v1/balance`, fetchConfig);
		let jsonResponse = await response.json();
		console.log(jsonResponse);
		return next();
	} catch (err) {
		return handleError(res, err);
	}
}


// Create a new payment.
export async function create (req, res) {
	try {
		const { uid, role, subscribed, email } = res.locals;
		const { type } = req.params;
		const db = admin.firestore();
		const paymentsPath = db.collection("payments");
		const statsPath = db.collection("stats");
		const chartsPath = db.collection("charts");

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
		let { totalRevenue, totalMrr } = adminStatsData;
		let adminRevenue = adminStatsData.revenue;
		let adminMrr = adminStatsData.mrr;
		let adminUnpaid = adminStatsData.unpaid;
		let adminSales = adminStatsData.sales;

		// Initialize variables for use below.
		let upline, uplineUid, uplineRevenue, uplineMrr, uplineUnpaid, uplineSales, uplineInvoiceId, uplineStats;

		// Get upline stats. Same as admin if level-1 user.
		if (["level-1", "level-2", "level-3"].includes(role)) {
			uplineUid = userData.uplineUid;
			upline = paymentsPath.doc(uplineUid);
			uplineStats = statsPath.doc(uplineUid);
			const uplineStatsRef = await uplineStats.get();
			const uplineStatsData = uplineStatsRef.data();
			uplineRevenue = uplineStatsData.revenue;
			uplineMrr = uplineStatsData.mrr;
			uplineUnpaid = uplineStatsData.unpaid;
			uplineSales = uplineStatsData.sales;
			uplineInvoiceId = uplineStatsData.invoiceId;
		}

		// Initialize variables for use below.
		let topline, toplineRevenue, toplineMrr, toplineUnpaid, toplineSales, toplineInvoiceId, toplineStats;

		// Get the upline's upline (will be level-1) for level-3 users.
		if (role === "level-3") {
			// Get upline user data.
			const uplineRef = await usersPath.doc(uplineUid).get();
			const uplineData = uplineRef.data();

			// Get topline stats. Will be level-1 user.
			const toplineUid = uplineData.uplineUid; // The upline's upline.
			topline = paymentsPath.doc(toplineUid);
			toplineStats = statsPath.doc(toplineUid);
			const toplineStatsRef = await toplineStats.get();
			const toplineStatsData = toplineStatsRef.data();
			toplineRevenue = toplineStatsData.revenue;
			toplineMrr = toplineStatsData.mrr;
			toplineUnpaid = toplineStatsData.unpaid;
			toplineSales = toplineStatsData.sales;
			toplineInvoiceId = toplineStatsData.invoiceId;
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
		if (role === "level-2" || role === "level-3") {
			adminUnpaid += value / 2;
			adminRevenue += value / 2;
		}
		if (role === "level-1" || role === "standard") adminRevenue += value;
		totalRevenue += value;
		adminSales++;
		adminStats.set({
			totalRevenue,
			totalMrr,
			revenue: adminRevenue,
			mrr: adminMrr,
			unpaid: adminUnpaid,
			sales: adminSales
		}, { merge: true });

		// Set stats for level-1 if level-2 user.
		if (role === "level-2") {
			if (newSub) uplineMrr += value / 2;
			uplineRevenue += value / 2;
			uplineUnpaid += value / 2;
			uplineSales++;
			uplineInvoiceId++;
			uplineStats.set({
				revenue: uplineRevenue,
				mrr: uplineMrr,
				unpaid: uplineUnpaid,
				sales: uplineSales,
				invoiceId: uplineInvoiceId
			}, { merge: true });
		}

		// Set stats for level-1 and level-2 if level-3 user.
		if (role === "level-3") {
			if (newSub) {
				uplineMrr += value / 4;
				toplineMrr += value / 4;
			}
			toplineRevenue += value / 4;
			toplineUnpaid += value / 4;
			toplineSales++;
			toplineInvoiceId++;
			toplineStats.set({
				revenue: toplineRevenue,
				mrr: toplineMrr,
				unpaid: toplineUnpaid,
				sales: toplineSales,
				invoiceId: toplineInvoiceId
			}, { merge: true });

			uplineRevenue += value / 4;
			uplineUnpaid += value / 4;
			uplineSales++;
			uplineInvoiceId++;
			uplineStats.set({
				revenue: uplineRevenue,
				mrr: uplineMrr,
				unpaid: uplineUnpaid,
				sales: uplineSales,
				invoiceId: uplineInvoiceId
			}, { merge: true });
		}

		if (newSub) await admin.auth().setCustomUserClaims(uid, { role, subscribed: true });


		// Increase revenues in charts data.
		const key = currentMonthKey();
		const exists = await chartExists(key);
		if (!exists) {
			initChartData();
		}
		const chartsRef = chartsPath.doc(key);
		const charts = await chartsRef.get();
		let { totalRevenues, netRevenues } = charts.data();
		totalRevenues += value;
		if (role === "admin" || role === "standard") {
			netRevenues += value;
		} else {
			netRevenues += value / 2;
		}
		chartsRef.set({ totalRevenues, netRevenues }, { merge: true });


		// Now add the commission invoices.
		const now = new Date();
		const date = now.toISOString();
		let commission;
		if (role === "level-2") commission = value / 2;
		if (role === "level-3") commission = value / 4;
		const invoice = {
			name: userData.name,
			uid,
			email,
			date,
			product: type,
			sale: value,
			commission,
			paid: false
		}

		// If level-2 user, generate invoice for upline (level-1) only.
		if (role === "level-2") {
			const uplineInvoice = upline.collection("invoices").doc(uplineInvoiceId.toString());
			uplineInvoice.set(invoice);
		}

		// If level-3 user, generate invoices for upline (level-2) and topline (level-1).
		if (role === "level-3") {
			const uplineInvoice = upline.collection("invoices").doc(uplineInvoiceId.toString());
			uplineInvoice.set(invoice);
			const toplineInvoice = topline.collection("invoices").doc(toplineInvoiceId.toString());
			toplineInvoice.set(invoice);
		}


		// Finally, do the payment receipts. Similar to invoice but for all users.
		const receipt = {
			name: userData.name,
			uid,
			email,
			date,
			action: "payment",
			product: type,
			sale: value,
		}

		// Get receiptId from user data, iterate and save.
		let { receiptId } = userData;
		receiptId++;
		usersPath.doc(uid).set({ receiptId }, { merge: true });

		// Save receipts to Firestore with the document name of receiptId.
		const receipts = paymentsPath.doc(uid).collection("receipts").doc(receiptId.toString());
		receipts.set(receipt);

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

/*
 * Various helper functions used throughout Firebase Functions.
 */
import admin from "firebase-admin";
import { MODE, ADMIN_UID } from "./constants.js";

// Add 31 days to the supplied date.
export function addMonth(date) {
  return new Date(date.setMonth(date.getMonth() + 1));
}

// Checks if provided UNIX date was in last 24 hours.
export function wasRecent(date) {
  const now = Math.floor(Date.now() / 1000);
  const interval = now - date;
  return interval < 24 * 60 * 60;
}

// Generate the document name for the Firestore charts collection this month.
export function currentMonthKey() {
  const now = new Date();
  const year = now.getFullYear().toString();
  let month = (now.getMonth() + 1).toString();
  if (month.length === 1) month = "0" + month;
  return `${year}-${month}`;
}

// Check if a chart corresponding to the provided document name exists in Firestore.
export async function chartExists(key) {
  const db = admin.firestore();
  const currentMonth = await db.collection("charts").doc(key).get();
  return currentMonth.exists;
}

// Initialize chart data for a new month in Firestore if not present.
export async function initChartData() {
  const db = admin.firestore();
  const key = currentMonthKey();
  const currentMonth = db.collection("charts").doc(key);
  await currentMonth.set({
    totalRevenues: 0,
    netRevenues: 0,
    joined: 0,
    cancelled: 0,
  });
}

// Return requested Stripe secret.
export function stripeSecrets(type) {
  if (type === "api" && MODE === "test") {
    return process.env.STRIPE_SECRET_KEY_TEST;
  } else if (type === "webhook-remote" && MODE === "test") {
    return process.env.STRIPE_WEBHOOK_SECRET_TEST;
  } else if (type === "api" && MODE === "live") {
    return process.env.STRIPE_SECRET_KEY_LIVE;
  } else if (type === "webhook-remote" && MODE === "live") {
    return process.env.STRIPE_WEBHOOK_SECRET_LIVE;
  } else if (type === "webhook-local") {
    return process.env.STRIPE_WEBHOOK_SECRET_LOCAL;
  } else {
    console.log("There was an error retrieving Stripe secret.");
  }
}

// Save recurring payment data to Firestore for admin console.
export async function recurringPayment(uid, role, email, type) {
  const db = admin.firestore();
  const paymentsPath = db.collection("payments");
  const statsPath = db.collection("stats");
  const chartsPath = db.collection("charts");

  // Get current user data.
  const usersPath = db.collection("users");
  const userRef = await usersPath.doc(uid).get();
  const userData = userRef.data();

  // Get admin stats as payments from all users will accrue here.
  const adminStats = statsPath.doc(ADMIN_UID);
  const adminStatsRef = await adminStats.get();
  const adminStatsData = adminStatsRef.data();
  let { totalRevenue } = adminStatsData;
  let adminRevenue = adminStatsData.revenue;
  let adminUnpaid = adminStatsData.unpaid;
  let adminSales = adminStatsData.sales;

  // Initialize variables for use below.
  let upline,
    uplineUid,
    uplineRevenue,
    uplineUnpaid,
    uplineSales,
    uplineInvoiceId,
    uplineStats;

  // Get upline stats. Same as admin if level-1 user.
  if (["level-1", "level-2", "level-3"].includes(role)) {
    uplineUid = userData.uplineUid;
    upline = paymentsPath.doc(uplineUid);
    uplineStats = statsPath.doc(uplineUid);
    const uplineStatsRef = await uplineStats.get();
    const uplineStatsData = uplineStatsRef.data();
    uplineRevenue = uplineStatsData.revenue;
    uplineUnpaid = uplineStatsData.unpaid;
    uplineSales = uplineStatsData.sales;
    uplineInvoiceId = uplineStatsData.invoiceId;
  }

  // Initialize variables for use below.
  let topline,
    toplineRevenue,
    toplineUnpaid,
    toplineSales,
    toplineInvoiceId,
    toplineStats;

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
    toplineUnpaid = toplineStatsData.unpaid;
    toplineSales = toplineStatsData.sales;
    toplineInvoiceId = toplineStatsData.invoiceId;
  }

  // Set value of payment type.
  let value;
  if (type === "join") value = 150;
  if (type === "watch") value = 50;

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
  adminStats.set(
    {
      totalRevenue,
      revenue: adminRevenue,
      unpaid: adminUnpaid,
      sales: adminSales,
    },
    { merge: true }
  );

  // Set stats for level-1 if level-2 user.
  if (role === "level-2") {
    uplineRevenue += value / 2;
    uplineUnpaid += value / 2;
    uplineSales++;
    uplineInvoiceId++;
    uplineStats.set(
      {
        revenue: uplineRevenue,
        unpaid: uplineUnpaid,
        sales: uplineSales,
        invoiceId: uplineInvoiceId,
      },
      { merge: true }
    );
  }

  // Set stats for level-1 and level-2 if level-3 user.
  if (role === "level-3") {
    toplineRevenue += value / 4;
    toplineUnpaid += value / 4;
    toplineSales++;
    toplineInvoiceId++;
    toplineStats.set(
      {
        revenue: toplineRevenue,
        unpaid: toplineUnpaid,
        sales: toplineSales,
        invoiceId: toplineInvoiceId,
      },
      { merge: true }
    );

    uplineRevenue += value / 4;
    uplineUnpaid += value / 4;
    uplineSales++;
    uplineInvoiceId++;
    uplineStats.set(
      {
        revenue: uplineRevenue,
        unpaid: uplineUnpaid,
        sales: uplineSales,
        invoiceId: uplineInvoiceId,
      },
      { merge: true }
    );
  }

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
    paid: false,
  };

  // If level-2 user, generate invoice for upline (level-1) only.
  if (role === "level-2") {
    const uplineInvoice = upline
      .collection("invoices")
      .doc(uplineInvoiceId.toString());
    uplineInvoice.set(invoice);
  }

  // If level-3 user, generate invoices for upline (level-2) and topline (level-1).
  if (role === "level-3") {
    const uplineInvoice = upline
      .collection("invoices")
      .doc(uplineInvoiceId.toString());
    uplineInvoice.set(invoice);
    const toplineInvoice = topline
      .collection("invoices")
      .doc(toplineInvoiceId.toString());
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
  };

  // Get receiptId from user data, iterate and save.
  let { receiptId } = userData;
  receiptId++;
  usersPath.doc(uid).set({ receiptId }, { merge: true });

  // Save receipts to Firestore with the document name of receiptId.
  const receipts = paymentsPath
    .doc(uid)
    .collection("receipts")
    .doc(receiptId.toString());
  receipts.set(receipt);
}

// Save a new activity to Firestore for display in the admin console.
export async function createActivity(uid, role, email, action, product) {
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
    date,
  };

  // Save activity data for consumption by admin.
  const adminActivity = activityPath.doc(ADMIN_UID).collection("admin");
  const adminActivityRef = adminActivity.doc(adminActivityId.toString());
  adminActivityRef.set(activityData);

  // Save activity data for consumption by level-1.
  if (role === "level-2") {
    const level1Activity = activityPath
      .doc(uplineData.uid)
      .collection("level-1");
    const level1ActivityRef = level1Activity.doc(uplineActivityId.toString());
    level1ActivityRef.set(activityData);
  }

  // Save activity data for consumption by level-1 and level-2.
  if (role === "level-3") {
    const level1Activity = activityPath
      .doc(uplineData.uplineUid)
      .collection("level-1");
    const level1ActivityRef = level1Activity.doc(toplineActivityId.toString());
    level1ActivityRef.set(activityData);

    const level2Activity = activityPath
      .doc(uplineData.uid)
      .collection("level-2");
    const level2ActivityRef = level2Activity.doc(uplineActivityId.toString());
    level2ActivityRef.set(activityData);
  }
}

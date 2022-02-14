/*
 * Various helper functions used throughout Firebase Functions.
 */
import admin from "firebase-admin";


// Add 31 days to the supplied date.
export function addMonth (date) {
 return new Date(date.setMonth(date.getMonth()+1));
}


// Returns true if user has not subscribed before and payment is subscription type.
export function newSubscriber (alreadySubbed, paymentType) {
  return !alreadySubbed && (paymentType === "join" || paymentType === "watch");
}


// Generate the document name for the Firestore charts collection this month.
export function currentMonthKey () {
  const now = new Date();
  const year = now.getFullYear().toString();
  let month = (now.getMonth() + 1).toString();
  if (month.length === 1) month = "0" + month;
  return `${year}-${month}`;
}


// Check if a chart corresponding to the provided document name exists in Firestore.
export async function chartExists (key) {
  const db = admin.firestore();
  const currentMonth = await db.collection("charts").doc(key).get();
  return currentMonth.exists;
}


// Initialize chart data for a new month in Firestore if not present.
export async function initChartData () {
  const db = admin.firestore();
  const key = currentMonthKey();
  const currentMonth = db.collection("charts").doc(key);
  await currentMonth.set({
    totalRevenues: 0,
    netRevenues: 0,
    joined: 0,
    cancelled: 0
  });
}

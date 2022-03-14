import functions from "firebase-functions";
import admin from "firebase-admin";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import usersRoute from "./users/usersRoute.js";
import paymentsRoute from "./payments/paymentsRoute.js";
import stripeRoute from "./stripe/stripeRoute.js";
import plaidRoute from "./plaid/plaidRoute.js";
import activityRoute from "./activity/activityRoute.js";

// Initialise the firebase-admin SDK in order to access its services.
admin.initializeApp();

const app = express();

// Automatically allow cross-origin requests.
app.use(cors({ origin: true }));

app.use(bodyParser.json());

// Set handler for Firebase & Firestore user accounts.
usersRoute(app);
// Set handler for payment information. This is admin console payments.
paymentsRoute(app);
// Set handler for Stripe actions. This handles real payments.
stripeRoute(app);
// Set handler for Plaid actions. This processes ACH payment data.
plaidRoute(app);
// Set handler for activities. These get displayed in the admin console.
activityRoute(app);

// Define secrets available in the app.
const secrets = {
  secrets: [
    "INSTAGRAM_HANDLE",
    "INSTAGRAM_PASSWORD",
    "STRIPE_SECRET_KEY_TEST",
    "STRIPE_SECRET_KEY_LIVE",
    "STRIPE_WEBHOOK_SECRET_LOCAL",
    "STRIPE_WEBHOOK_SECRET_TEST",
    "STRIPE_WEBHOOK_SECRET_LIVE",
  ],
};

// Expose Express API as a single Cloud Function.
export const api = functions.runWith(secrets).https.onRequest(app);

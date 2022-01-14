import functions from "firebase-functions";
import admin from "firebase-admin";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import usersRoute from "./users/usersRoute.js";
import paymentsRoute from "./payments/paymentsRoute.js";
import activityRoute from "./activity/activityRoute.js";


// Initialise the firebase-admin SDK in order to access its services.
admin.initializeApp();

const app = express();

// Automatically allow cross-origin requests.
app.use(cors({ origin: true }));

app.use(bodyParser.json());

// Set handler for user accounts.
usersRoute(app);
// Set handler for payment information.
paymentsRoute(app);
// Set handler for activities.
activityRoute(app);


// Expose Express API as a single Cloud Function.
export const api = functions.https.onRequest(app);

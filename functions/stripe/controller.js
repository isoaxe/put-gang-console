import admin from "firebase-admin";
import Stripe from "stripe";
import { stripeSecrets, wasRecent } from "./../util/helpers.js";


const stripe = new Stripe(stripeSecrets("api"), {
	apiVersion: "2020-08-27"
});

// Create a new customer in Stripe. Required for subscription payments.
export async function createCustomer (req, res) {
	try {
		const email = req.body.email;
		const customer = await stripe.customers.create({ email });
		const stripeUid = customer.id;

		res.send({ stripeUid });
	} catch (err) {
		return handleError(res, err);
	}
}


// Create a new subscription in Stripe.
export async function createSubscription (req, res) {
	try {
		const { priceId, customerId } = req.body;
		const subscription = await stripe.subscriptions.create({
			customer: customerId,
			items: [{
				price: priceId,
			}],
			payment_behavior: "default_incomplete",
			expand: ["latest_invoice.payment_intent"],
		});

		res.send({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });
	} catch (err) {
		return handleError(res, err);
	}
}


// Function for admin console actions when customer gets re-billed by Stripe.
export async function subscriptionPayment (req, res) {
	let event = req.rawBody;
	try {
		const endpointSecret = stripeSecrets("webhook-local");
		const sig = req.headers["stripe-signature"];
		event = await stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
	} catch (err) {
		console.log("⚠️  Webhook signature verification failed.", err.message);
		return handleError(res, err);
	}

	// Handle the event.
	let invoicePaid, customerId, customer;
	switch (event.type) {
		case "invoice.paid":
			invoicePaid = event.data.object;
			customerId = invoicePaid.customer;
			customer = await stripe.customers.retrieve(customerId);
			if (wasRecent(customer.created)) {
				console.log("Customer was created recently.");
				console.log("Payment data captured via client api call instead.");
				res.status(200).send();
				break;
			}
			if (invoicePaid.paid) {
				const db = admin.firestore();
				const usersPath = db.collection("users");
				const userRef = await usersPath.where("stripeUid", "==", customerId).get();
				const userData = userRef.data();
				const { uid, role, email, membLvl } = userData;
				console.log("✅  Payment made and confirmed.");
			} else {
				console.log("⚠️  Payment was not made.");
			}
			res.status(200).send();
			break;
		default:
			console.log(`Unhandled event type ${event.type}.`);
			res.status(404).send();
	}
}


// Standard error helper function.
function handleError (res, err) {
	return res.status(500).send({ error: `${err}` });
}

import { createPaymentsIntent, createCustomer, createSubscription } from "./controller.js";


export default function stripeRoute (app) {
	// Create a payments intent.
	// This is required to get a client secret and initialize Stripe Elements api.
	app.post("/stripe/payments",
		createPaymentsIntent
	);
	// Create a new customer in Stripe.
	app.post("/stripe/customer",
		createCustomer
	);
	// Create a new subscription in Stripe.
	app.post("/stripe/subscription",
		createSubscription
	);
}

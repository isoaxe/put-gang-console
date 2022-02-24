import { createCustomer, createSubscription } from "./controller.js";


export default function stripeRoute (app) {
	// Create a new customer in Stripe.
	app.post("/stripe/customer",
		createCustomer
	);
	// Create a new subscription in Stripe.
	app.post("/stripe/subscription",
		createSubscription
	);
}

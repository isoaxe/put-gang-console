import { createPaymentsIntent } from "./controller.js";


export default function stripeRoute (app) {
	// Create a payments intent.
	// This is required to get a client secret and initialize Stripe Elements api.
	app.post("/stripe/payments",
		createPaymentsIntent
	);
}

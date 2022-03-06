import Stripe from "stripe";
import { stripeSecrets } from "./../util/helpers.js";


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
		const endpointSecret = "whsec_a93f68cea823803686857ea0881d9d930c72c16e62752052fa6b8ccf1f9a6b82";
		const sig = req.headers["stripe-signature"];
		event = await stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
	} catch (err) {
		console.log("⚠️  Webhook signature verification failed.", err.message);
		return handleError(res, err);
	}

	// Handle the event.
	let invoicePaid;
	switch (event.type) {
		case "invoice.paid":
			invoicePaid = event.data.object;
			if (invoicePaid.paid) {
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

import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST, {
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


// Standard error helper function.
function handleError (res, err) {
	return res.status(500).send({ error: `${err}` });
}

import admin from "firebase-admin";
import Stripe from "stripe";
import {
  stripeSecrets,
  wasRecent,
  recurringPayment,
} from "./../util/helpers.js";

const stripe = new Stripe(stripeSecrets("api"), {
  apiVersion: "2020-08-27",
});

// Create a new customer in Stripe. Required for subscription payments.
export async function createCustomer(req, res) {
  try {
    const email = req.body.email;
    const customer = await stripe.customers.create({ email });
    const stripe_uid = customer.id;

    res.send({ stripe_uid });
  } catch (err) {
    return handleError(res, err);
  }
}

// Create a new subscription in Stripe.
export async function createSubscription(req, res) {
  try {
    const { priceId, customerId } = req.body;
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId,
        },
      ],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    res.send({
      subscription_id: subscription.id,
      client_secret: subscription.latest_invoice.payment_intent.client_secret,
      payment_intent_id: subscription.payment_intent.id,
    });
  } catch (err) {
    return handleError(res, err);
  }
}

// Make a payment by completing a PaymentIntent.
export async function achPayment(req, res) {
  try {
    const { paymentIntentId } = req.body;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log(paymentIntent);
  } catch (err) {
    return handleError(res, err);
  }
}

// Function for admin console actions when customer gets re-billed by Stripe.
export async function subscriptionPayment(req, res) {
  let event = req.rawBody;
  try {
    const endpointSecret = stripeSecrets("webhook-remote");
    const sig = req.headers["stripe-signature"];
    event = await stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      endpointSecret
    );
  } catch (err) {
    console.log("⚠️  Webhook signature verification failed.", err.message);
    return handleError(res, err);
  }

  // Handle the event.
  let invoicePaid,
    customerId,
    customer,
    subscription,
    subExpires,
    subExpiresAsInt;
  switch (event.type) {
    case "invoice.paid":
      invoicePaid = event.data.object;
      customerId = invoicePaid.customer;
      customer = await stripe.customers.retrieve(customerId);
      subscription = await stripe.subscriptions.list({ customer: customerId });
      if (subscription) {
        // Assumes only a single subscription active.
        subExpiresAsInt = subscription.data[0].current_period_end;
        subExpires = new Date(subExpiresAsInt * 1000).toISOString();
      }
      if (wasRecent(customer.created)) {
        console.log("ℹ️  Customer was created recently.");
        console.log("Payment data captured via client api call instead.");
        res.status(200).send();
        break;
      }
      if (invoicePaid.paid) {
        const db = admin.firestore();
        const usersPath = db.collection("users");
        const userRef = await usersPath
          .where("stripeUid", "==", customerId)
          .get();
        const userData = userRef.docs[0].data();
        const { uid, role, email, membLvl } = userData;
        await usersPath
          .doc(uid)
          .set({ expiryDate: subExpires }, { merge: true });
        recurringPayment(uid, role, email, membLvl);
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
function handleError(res, err) {
  return res.status(500).send({ error: `${err}` });
}

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
    const { email } = req.body;
    const customer = await stripe.customers.create({ email });
    const stripe_uid = customer.id;

    res.status(201).send({ stripe_uid });
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
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    res.status(201).send({
      subscription_id: subscription.id,
      client_secret: subscription.latest_invoice.payment_intent.client_secret,
      payment_intent_id: subscription.latest_invoice.payment_intent.id,
    });
  } catch (err) {
    return handleError(res, err);
  }
}

// Make a payment by completing a PaymentIntent.
export async function achPayment(req, res) {
  try {
    const { bankAccountId, paymentIntentId } = req.body;

    const db = admin.firestore();
    const bankRef = db.collection("plaid").doc(bankAccountId);
    const bank = await bankRef.get();
    const { account_holder_type, account_type, routing_number } = bank.data();
    bankRef.delete();

    // Create a new PaymentMethod and use to update PaymentIntent.
    const paymentMethod = await stripe.paymentMethods.create({
      type: "us_bank_account",
      us_bank_account: {
        account_holder_type: "individual",
        account_type: "checking",
        routing_number,
      },
    });
    const payment_method_id = paymentMethod.id;

    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      payment_method: payment_method_id,
    });
    res.status(200).send(paymentIntent);
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
    subExpiresAsInt,
    dataObject;
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
    // Update customer with default payment method when subcription is created.
    case "invoice.payment_succeeded":
      dataObject = event.data.object;
      if (dataObject["billing_reason"] == "subscription_create") {
        const customerId = dataObject["customer"];
        const payment_intent_id = dataObject["payment_intent"];
        const payment_intent = await stripe.paymentIntents.retrieve(
          payment_intent_id
        );
        await stripe.customers.update(customerId, {
          invoice_settings: {
            default_payment_method: payment_intent.payment_method,
          },
        });
        console.log({ success: "✅  Payment method is now default" });
        res.status(200).send();
      } else {
        console.log({ message: "Subsequent subscription payment, so ignore" });
        res.status(204).send();
      }
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

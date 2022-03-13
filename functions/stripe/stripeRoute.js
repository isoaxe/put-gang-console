import {
  createCustomer,
  createSubscription,
  subscriptionPayment,
} from "./controller.js";

export default function stripeRoute(app) {
  // Create a new customer in Stripe.
  app.post("/stripe/customer", createCustomer);
  // Create a new subscription in Stripe.
  app.post("/stripe/subscription", createSubscription);
  // Webhook for when customer is re-billed by Stripe.
  app.post("/stripe/webhook/subscription-payment", subscriptionPayment);
}

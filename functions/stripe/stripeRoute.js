import {
  createCustomer,
  createSubscription,
  changePaymentType,
  achPayment,
  subscriptionPayment,
} from "./controller.js";

export default function stripeRoute(app) {
  // Create a new customer in Stripe.
  app.post("/stripe/customer", createCustomer);
  // Create a new subscription in Stripe.
  app.post("/stripe/subscription", createSubscription);
  // Modify a subscription payment method type in Stripe.
  app.patch("/stripe/payment-type", changePaymentType);
  // Create a new ACH back payment in Stripe.
  app.post("/stripe/payment", achPayment);
  // Webhook for when customer is re-billed by Stripe.
  app.post("/stripe/webhook/subscription-payment", subscriptionPayment);
}

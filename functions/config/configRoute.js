import { getPaymentOptions, setPaymentOptions } from "./controller.js";

export default function configRoute(app) {
  // Check whether card payment option should be shown to the user.
  app.get("/config/payment-options", getPaymentOptions);
  // Specify if card payment option should be shown to the user.
  app.patch("/config/payment-options", setPaymentOptions);
}

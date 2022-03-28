import { getConfigData, setPaymentOptions } from "./controller.js";

export default function configRoute(app) {
  // Get all configuration data.
  app.get("/config/all", getConfigData);
  // Specify if card payment option should be shown to the user.
  app.patch("/config/payment-options", setPaymentOptions);
}

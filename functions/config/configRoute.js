import { getPaymentConfig, setPaymentOptions } from "./controller.js";

export default function configRoute(app) {
  // Check what payment options should be displayed in ChoiceModal.
  app.get("/config/payment-options", getPaymentConfig);
  // Specify if card payment option should be shown to the user.
  app.post("/config/payment-options", setPaymentOptions);
}

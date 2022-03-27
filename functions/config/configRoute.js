import { getPaymentConfig } from "./controller.js";

export default function configRoute(app) {
  // Check what payment options should be displayed in ChoiceModal.
  app.get("/config/payment-options", getPaymentConfig);
}

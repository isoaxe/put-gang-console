import { getConfigData, setPaymentOptions } from "./controller.js";
import { isAuthenticated } from "./../auth/authenticated.js";
import { isAuthorized } from "./../auth/authorized.js";

export default function configRoute(app) {
  // Get all configuration data.
  app.get("/config/all", getConfigData);
  // Specify if card payment option should be shown to the user.
  app.patch(
    "/config/payment-options",
    isAuthenticated,
    isAuthorized({ hasRole: ["admin"] }),
    setPaymentOptions
  );
}

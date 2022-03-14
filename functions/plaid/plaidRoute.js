import { createLinkToken } from "./controller.js";

export default function plaidRoute(app) {
  // Create a link_token for initialization of Plaid Link.
  app.post("/plaid/create-link-token", createLinkToken);
}

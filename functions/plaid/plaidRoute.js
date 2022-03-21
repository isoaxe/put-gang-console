import {
  createLinkToken,
  exchangeTokens,
  saveBankAccount,
} from "./controller.js";

export default function plaidRoute(app) {
  // Create a link_token for initialization of Plaid Link.
  app.post("/plaid/create-link-token", createLinkToken);
  // Exchange a public_token for an access_token.
  app.post("/plaid/exchange-tokens", exchangeTokens);
  // Save bank details to Stripe customer object.
  app.post("plaid/save-bank", saveBankAccount);
}

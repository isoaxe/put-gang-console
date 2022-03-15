import plaid from "plaid";
import { PLAID_CLIENT_ID } from "./../util/constants.js";

// Create a link_token for initialization of Plaid Link.
export async function createLinkToken(req, res) {
  try {
    const plaidClient = new plaid.Client(
      PLAID_CLIENT_ID,
      process.env.PLAID_SECRET_KEY_SANDBOX,
      plaid.environments.sandbox
    );

    // TODO: Can I add Firebase uid later?
    const clientUserId = "Firebase uid here...";

    plaidClient.createLinkToken(
      {
        user: {
          client_user_id: clientUserId,
        },
        client_name: "Put Gang",
        products: ["auth"],
        country_codes: ["US"],
        language: "en",
        webhook: "https://sample.webhook.com",
      },
      function (error, linkTokenResponse) {
        // Pass the result to your client-side app to initialize Link
        res.json({ link_token: linkTokenResponse.link_token });
      }
    );
  } catch (err) {
    return handleError(res, err);
  }
}

// Standard error helper function.
function handleError(res, err) {
  return res.status(500).send({ error: `${err}` });
}

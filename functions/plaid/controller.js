import plaid from "plaid";

// Create a link_token for initialization of Plaid Link.
export async function createLinkToken(req, res) {
  try {
    const plaidClient = new plaid.Client(
      "{{PLAID_CLIENT_ID}}",
      "{{PLAID_SECRET}}",
      plaid.environments.sandbox
    );

    const clientUserId = "Stripe test";

    plaidClient.createLinkToken(
      {
        user: {
          client_user_id: clientUserId,
        },
        client_name: "My App",
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

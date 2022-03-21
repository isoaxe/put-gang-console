import admin from "firebase-admin";
import Stripe from "stripe";
import {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  Products,
  CountryCode,
} from "plaid";
import { stripeSecrets } from "./../util/helpers.js";
import { PLAID_CLIENT_ID } from "./../util/constants.js";

const stripe = new Stripe(stripeSecrets("api"), {
  apiVersion: "2020-08-27",
});

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET_KEY_SANDBOX,
    },
  },
});

const client = new PlaidApi(configuration);

// Create a link_token for initialization of Plaid Link.
export async function createLinkToken(req, res) {
  // TODO: Can I add Firebase uid later?
  const clientUserId = "Firebase uid here...";

  const request = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: clientUserId,
    },
    client_name: "Put Gang",
    products: [Products.Auth],
    language: "en",
    webhook: "https://webhook.example.com",
    country_codes: [CountryCode.Us],
  };
  try {
    const createTokenResponse = await client.linkTokenCreate(request);

    res.json(createTokenResponse.data);
  } catch (err) {
    return handleError(res, err);
  }
}

// Exchange a public token for an access token.
export async function exchangeTokens(req, res) {
  try {
    const { public_token, account_id } = req.body;
    const response = await client.itemPublicTokenExchange({ public_token });
    const { access_token } = response.data;

    const db = admin.firestore();
    const plaidRef = db.collection("plaid").doc(account_id);
    await plaidRef.set({ account_id, access_token });
    res.status(200).send({ success: "access token temporarily cached" });
  } catch (err) {
    handleError(res, err);
  }
}

// Create a bank account with Plaid access_token and save to Stripe customer.
export async function saveBankAccount(req, res) {
  try {
    // Get required variables from request body and Firestore.
    const { accountId, stripeUid } = req.body;
    const db = admin.firestore();
    const plaid = await db.collection("plaid").doc(accountId).get();
    const { access_token } = plaid.data();

    // Use access_token to get bank details and save to Stripe customer.
    const request = { access_token, account_id: accountId };
    const stripeTokenResponse =
      await client.processorStripeBankAccountTokenCreate(request);
    const bankAccountToken = stripeTokenResponse.data.stripe_bank_account_token;
    const bankAccount = await stripe.customers.createSource(stripeUid, {
      source: bankAccountToken,
    });
    console.log("bankAccount:", bankAccount);
    res.status(200).send({ success: "Bank details saved to Stripe" });
  } catch (err) {
    handleError(res, err);
  }
}

// Standard error helper function.
function handleError(res, err) {
  return res.status(500).send({ error: `${err}` });
}

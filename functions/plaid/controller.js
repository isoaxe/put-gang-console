import admin from "firebase-admin";
import Stripe from "stripe";
import { Configuration, PlaidApi, Products, CountryCode } from "plaid";
import { stripeSecrets, plaidSecrets, setPlaidEnv } from "./../util/helpers.js";
import { PLAID_CLIENT_ID } from "./../util/constants.js";

const stripe = new Stripe(stripeSecrets("api"), {
  apiVersion: "2020-08-27",
});

const configuration = new Configuration({
  basePath: setPlaidEnv("sand"),
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
      "PLAID-SECRET": plaidSecrets("sand"),
    },
  },
});

const client = new PlaidApi(configuration);

// Create a link_token for initialization of Plaid Link.
export async function createLinkToken(req, res) {
  const request = {
    user: { client_user_id: "Firebase uid unknown" },
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
    const { plaidAccountId, stripeUid } = req.body;
    const db = admin.firestore();
    const plaidRef = db.collection("plaid").doc(plaidAccountId);
    const plaid = await plaidRef.get();
    const { access_token } = plaid.data();
    plaidRef.delete();

    // Use access_token to get bank details and save to Stripe customer.
    const request = { access_token, account_id: plaidAccountId };
    const stripeTokenResponse =
      await client.processorStripeBankAccountTokenCreate(request);
    const bankAccountToken = stripeTokenResponse.data.stripe_bank_account_token;
    const bankAccount = await stripe.customers.createSource(stripeUid, {
      source: bankAccountToken,
    });
    const { account_holder_type, account_type, routing_number } = bankAccount;

    const bankRef = db.collection("plaid").doc(bankAccount.id);
    await bankRef.set({ account_holder_type, account_type, routing_number });

    res.status(200).send({
      success: "Bank details saved to Stripe",
      bank_account_id: bankAccount.id,
    });
  } catch (err) {
    handleError(res, err);
  }
}

// Standard error helper function.
function handleError(res, err) {
  return res.status(500).send({ error: `${err}` });
}

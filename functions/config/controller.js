import admin from "firebase-admin";

// Check whether payment choices should be displayed on the ChoiceModal.
export async function getPaymentConfig(req, res) {
  try {
    const db = admin.firestore();
    const configRef = await db.collection("config").doc("config").get();
    const { paymentChoices } = configRef.data();

    res.status(200).send({ paymentChoices });
  } catch (err) {
    return handleError(res, err);
  }
}

// Standard error helper function.
function handleError(res, err) {
  return res.status(500).send({ error: `${err}` });
}

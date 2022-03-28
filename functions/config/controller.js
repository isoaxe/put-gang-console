import admin from "firebase-admin";

// Check whether card payment option should be shown to the user.
export async function getConfigData(req, res) {
  try {
    const db = admin.firestore();
    const configRef = await db.collection("config").doc("config").get();
    const configData = configRef.data();

    res.status(200).send(configData);
  } catch (err) {
    return handleError(res, err);
  }
}

// Specify whether card payment option should be shown to user.
export async function setPaymentOptions(req, res) {
  try {
    const { paymentChoices } = req.body;
    const db = admin.firestore();
    const config = db.collection("config").doc("config");
    config.set({ paymentChoices }, { merge: true });

    res.sendStatus(204);
  } catch (err) {
    return handleError(res, err);
  }
}

// Standard error helper function.
function handleError(res, err) {
  return res.status(500).send({ error: `${err}` });
}

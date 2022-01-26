/*
 * Various helper functions used throughout the project.
 */
import firebase from 'firebase/app';
import { API_URL } from './urls';


// Turns a compound object into an array of objects.
// Each object in the array is the value from original with key inserted.
export function objectToArray (compoundObj) {
  const result = [];
  const keys = Object.keys(compoundObj);
  keys.forEach(key => {
    const obj = compoundObj[key]; // Nested object is value.
    obj["id"] = key; // Add key to object.
    result.push(obj);
  })
  return result;
}


// Get data from Firestore at given endpoint and optionally save to state.
export async function getData (endpoint, setterFunction) {
  const token = await firebase.auth().currentUser.getIdToken(true);
  const fetchConfig = {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };
  const response = await fetch(API_URL + endpoint, fetchConfig);
  const jsonResponse = await response.json();
  if (setterFunction) {
    setterFunction(jsonResponse); // Stores data to state.
  }
  if (jsonResponse.error) {
    console.error(jsonResponse);
  }
  return jsonResponse;
}


// Fetch receipts from api, format and then save to state and turn on modal.
export async function displayReceipts (uid, setReceipts, setVisible) {
  const rawReceipts = await getData(`/payments/receipts/${uid}`);
  const receiptsArray = objectToArray(rawReceipts).reverse();
  receiptsArray.forEach(item => item["statement"] = formatReceiptStatement(
    item.name,
    item.email,
    item.action,
    item.product,
    item.sale
  ));
  setReceipts(receiptsArray);
  setVisible(true);
}


/*
 *   Helper functions for the above helpers.
 *   As such, these do not get exported.
 */

 // Form a statement for each receipt based on data.
 function formatReceiptStatement (name, email, action, product, sale) {
   let productStatement, actionStatement;
   if (action === "join") actionStatement = "Subscription started for";
   if (action === "payment") actionStatement = `$${sale} payment made for`;
   if (action === "cancel") actionStatement = "Subscription cancelled for"
   if (product === "join") productStatement = "Join the Discussion";
   if (product === "watch") productStatement = "Watch the Discussion";
   return `${actionStatement} ${productStatement}.`
 }

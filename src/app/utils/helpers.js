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


// Get data from Firestore at given endpoint and save to state.
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
  setterFunction(jsonResponse); // Stores data to state.
  if (jsonResponse.error) {
    console.error(jsonResponse);
  }
}

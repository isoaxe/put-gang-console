/*
 * Set api and base URLs dynamically based on environment and host.
 */

// These are the static hosted urls displayed in <Links/>.
export const LANDING_URL = "https://put-gang-landing.web.app";
export const CONSOLE_URL = "https://put-gang-console.web.app";

// Set API_URL based on whether locally hosted emulator is running or not.
const localApiUrl = "http://localhost:5001/put-gang/us-central1/api";
const remoteApiUrl = "https://us-central1-put-gang.cloudfunctions.net/api";

export const API_URL =
  window.location.hostname === "localhost" ? localApiUrl : remoteApiUrl;

// Set BASE_URL based on whether locally hosted emulator is running or not.
// If running locally, also detect whether in development or production environment.
let localBaseUrl = "unassigned";
if (process.env.NODE_ENV === "development") {
  localBaseUrl = "http://localhost:3000";
} else if (process.env.NODE_ENV === "production") {
  localBaseUrl = "http://localhost:5000";
}

export const BASE_URL =
  window.location.hostname === "localhost" ? localBaseUrl : CONSOLE_URL;

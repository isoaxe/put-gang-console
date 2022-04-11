/*
 * Set api and base URLs dynamically based on environment and host.
 */

// These are the static hosted urls displayed in <Links/>.
export const LANDING_URL = "https://put-gang-landing.web.app";
export const CONSOLE_URL = "https://put-gang-console.web.app";

// Set API_URL based on whether locally hosted emulator is running or not.
const localApiUrl = "http://localhost:5001/put-gang/us-central1/api";
const remoteApiUrl = "https://us-central1-put-gang.cloudfunctions.net/api";
const local = window.location.hostname === "localhost";

export const API_URL = local ? localApiUrl : remoteApiUrl;

// Set BASE_URL based on whether locally hosted emulator is running or not.
// If running locally, also detect whether in development or production environment.
let localBaseUrl = "unassigned";
if (process.env.NODE_ENV === "development") {
  localBaseUrl = "http://localhost:3000";
} else if (process.env.NODE_ENV === "production") {
  localBaseUrl = "http://localhost:5000";
}

export const BASE_URL = local ? localBaseUrl : CONSOLE_URL;

/*
Discord oauth2 url
You can generate this from the dev panel
*/
const RemoteOauth =
  "https://discord.com/api/oauth2/authorize?client_id=961754087341305876&redirect_uri=http%3A%2F%2Flocalhost%3A5001%2Fput-gang%2Fus-central1%2Fapi%2Fdiscord%2F&response_type=code&scope=guilds.join%20identify";
const LocalOauth =
  "https://discord.com/api/oauth2/authorize?client_id=961754087341305876&redirect_uri=http%3A%2F%2Flocalhost%3A5001%2Fput-gang%2Fus-central1%2Fapi%2Fdiscord%2F&response_type=code&scope=guilds.join%20identify";

export const OAUTH_URL = local ? LocalOauth : RemoteOauth;

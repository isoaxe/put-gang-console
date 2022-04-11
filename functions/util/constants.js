/*
 * Constants that are used at several points throughout functions.
 * Better to have a single point of reference that can changed as necessary.
 */

// Manually switch between test and live modes.
export const MODE = "test"; // enum 'test' || 'live'

// User ID and email for admin.
export const ADMIN_UID = "ocxVcejnEce6Pglc2QWzcakbgAT2";
export const ADMIN_EMAIL = "phillymantis@gmail.com";

// Discord role and guild ids.
export const GANGSTA_ID =
  MODE === "test" ? "961899836960018432" : "838608029771366410"; // Corresponds to 'watch'.
export const SUPER_GANGSTA_ID =
  MODE === "test" ? "963004634316828702" : "845763952469213206"; // Corresponds to 'join'.
export const DISCORD_GUILD_ID =
  MODE === "test" ? "961899170241839104" : "797133925616975933";

/*
Discord oauth2 url
You can generate this from the dev panel
*/
const RemoteOauth =
  "https://discord.com/api/oauth2/authorize?client_id=961754087341305876&redirect_uri=http%3A%2F%2Flocalhost%3A5001%2Fput-gang%2Fus-central1%2Fapi%2Fdiscord%2F&response_type=code&scope=guilds.join%20identify";
const LocalOauth =
  "https://discord.com/api/oauth2/authorize?client_id=961754087341305876&redirect_uri=http%3A%2F%2Flocalhost%3A5001%2Fput-gang%2Fus-central1%2Fapi%2Fdiscord%2F&response_type=code&scope=guilds.join%20identify";

export const OAUTH_URL = MODE === "test" ? LocalOauth : RemoteOauth;

const localRedUrl = "http://localhost:5001/put-gang/us-central1/api";
const remoteRedUrl = "https://us-central1-put-gang.cloudfunctions.net/api";

export const REDIRECT_URL = MODE === "test" ? localRedUrl : remoteRedUrl;

/*



I'm Guessing test means locally run




*/

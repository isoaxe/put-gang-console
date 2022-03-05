/*
 * Set api URL dynamically based on host.
 */

// Set API_URL based on whether locally hosted emulator is running or not.
const localApiUrl = "http://localhost:5001/put-gang/us-central1/api";
const remoteApiUrl = "https://us-central1-put-gang.cloudfunctions.net/api";

//export const API_URL = ((window.location.hostname === "localhost") ? localApiUrl : remoteApiUrl);
// TODO: Conditionally select the local or remote api address. Can't use the global window object as it's not available in the server.
export const API_URL = localApiUrl;

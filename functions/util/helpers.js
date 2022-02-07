/*
 * Various helper functions used throughout the project.
 */
 import fetch from "node-fetch";


// Add 31 days to the supplied date.
export function addMonth (date) {
 return new Date(date.setMonth(date.getMonth()+1));
}


// Returns true if user has not subscribed before and payment is subscription type.
export function newSubscriber (alreadySubbed, paymentType) {
  return !alreadySubbed && (paymentType === "join" || paymentType === "watch");
}



/*
 *   Helper functions for the above helpers.
 *   As such, these do not get exported.
 */

async function getAvatarUrl(username) {
  const fetchConfig = {
    method: "GET",
    headers: {
      host: "www.instagram.com"
    }
  };
  const response = await fetch(`https://www.instagram.com/${username}/?__a=1`, fetchConfig);
  const jsonResponse = await response.json();
  const photoUrl = jsonResponse.graphql?.user?.profile_pic_url_hd;
  return photoUrl;
}

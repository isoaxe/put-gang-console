/*
 * Various helper functions used throughout the project.
 */
import admin from "firebase-admin";
import fetch from "node-fetch";


// Add 31 days to the supplied date.
export function addMonth (date) {
 return new Date(date.setMonth(date.getMonth()+1));
}


// Returns true if user has not subscribed before and payment is subscription type.
export function newSubscriber (alreadySubbed, paymentType) {
  return !alreadySubbed && (paymentType === "join" || paymentType === "watch");
}

export async function getAvatar (username) {
  let url = null;
  let from_cache = false;

  const cache = await getAvatarFromCache(username);
  if (cache.exists) {
    url = cache.url;
    from_cache = true;
  } else {
    const picUrl = await getAvatarUrl(username);
    const imgBuffer = await getAvatarImage(picUrl);
    url = await uploadAvatar(imgBuffer, username);
  }
  return { url, from_cache };
}



/*
 *   Helper functions for the above helpers.
 *   As such, these do not get exported.
 */
const bucketPath = "avatars";
const bucketId = "gs://put-gang.appspot.com";

async function getAvatarUrl (username) {
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

async function getAvatarImage (url) {
  let response = await fetch(url);
  let data = await response.arrayBuffer();
  const buffer = Buffer.from(data);
  return buffer;
}

async function uploadAvatar (imageBuffer, username) {
  const storage = admin.storage().bucket(bucketId);
  const file = storage.file(`${bucketPath}/${username}.png`);
  await file.save(imageBuffer, {
    metadata: {
      contentType: "image/png",
      origin: ["*"],
    }
  });
  await file.makePublic();
  return file.publicUrl();
}

async function getAvatarFromCache (username) {
  const storage = admin.storage().bucket(bucketId);
  let file = storage.file(`${bucketPath}/${username}.png`);
  let exists = await file.exists();
  if (exists[0]) {
    return { exists: true, url: file.publicUrl() };
  } else {
    return { exists: false, url: null };
  }
}

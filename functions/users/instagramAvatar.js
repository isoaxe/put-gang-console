import Firestore from "@google-cloud/firestore";
import { Storage } from "@google-cloud/storage";
import admin from "firebase-admin";
import fetch from "node-fetch";


// Declare variables.
const username = "";
const password = "";
const saveUserInfo = true;
const defaultPicUrl = null;
const bucketPath = "avatars";
const bucketId = "gs://put-gang.appspot.com";
const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36"

// Initialize Firebase products.
const db = new Firestore();
const storage = new Storage();
const instagramDb = db.collection(bucketPath);
const bucket = storage.bucket(bucketId);

// Checks to see if photo is already in Firebase Storage first. If not, retrieve
// url from Instagram, save photo to Storage and return that url.
// This prevents excessive calls and avoids Instagram blocking our requests.
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
 *   Helper functions for the above function.
 *   As such, these do not get exported.
 */

// Returns the users instagram profile photo from the Public api.
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

// Return the profile photo at the provided url.
async function getAvatarImage (url) {
  let response = await fetch(url);
  let data = await response.arrayBuffer();
  const buffer = Buffer.from(data);
  return buffer;
}

// Uploads the profile photo to a Firebase storage bucket.
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

// Checks to see if the photo is already in Firebase storage.
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

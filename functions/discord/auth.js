import axios from "axios";
import admin from "firebase-admin";
import { GetUser } from "./getUser.js";
import { JoinGuild } from "./joinGuild.js";
import { Database } from "./db.js";
import {
  OAUTH_URL,
  REDIRECT_URL,
  GANGSTA_ID,
  SUPER_GANGSTA_ID,
} from "./../util/constants.js";

const STATES = {
  fhjsdgfgjdgsgfjhgsd: {
    type: "watch",
    role: GANGSTA_ID,
  },
  urerjenckphgvcrjebn: {
    type: "join",
    role: SUPER_GANGSTA_ID,
  },
};

export async function discordAuth(req, res) {
  /**
   * Here code is the code parameter we get after user authentication
   * The user having code parameter means they are coming from the discord oauth2 page
   * After completing signup
   */
  const code = req.query.code;
  const state = atob(req.query.state || " ");
  /**
   * So,
   * If the user dosen't have the code parameter
   * means they're here for the first time
   * And we'll send them to the auth url
   * else we'll process the request
   */
  if (!code) {
    return res.status(307).redirect(OAUTH_URL);
  }
  const db = new Database(admin.firestore(), "discord");
  axios({
    method: "post",
    url: "https://discord.com/api/oauth2/token",
    data: new URLSearchParams({
      client_id: process.env.DISCORD_APP_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: REDIRECT_URL,
      scope: "identify guilds.join",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(async (data) => {
      if (!data.data.access_token) {
        return res.status(502).send("BAD GATEWAY");
      }
      GetUser(data.data.access_token).then((u) => {
        let user = u;
        /**
         * It's better to save these data along with others
         */
        user.token = data.data.access_token;
        user.scope = data.data.scope;
        user.refresh_token = data.data.refresh_token;
        if (!state || !STATES[state]) {
          user.role = null;
          user.type = null;
        } else if (STATES[state]) {
          user.role = STATES[state].role;
          user.type = STATES[state].type;
        } else {
          user.role = null;
          user.type = null;
        }
        db.set(user.id, user);
        JoinGuild(data.data.access_token, process.env.GUILD_ID, user.id, [
          user.role,
        ])
          .then(() => {
            res.status(200).redirect("/");
          })
          .catch((err) => {
            res.status(500).send("Server error");
            console.log(err);
          });
      });
    })
    .catch((err) => {
      res.status(500).send("Server Error");
      console.log(err);
    });
}

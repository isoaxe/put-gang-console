import axios from 'axios';
import admin from "firebase-admin";
import { GetUser } from "./getUser.js"
import { JoinGuild } from "./joinGuild.js"
import { Database } from "./db.js"
import { OAUTH_URL, REDIRECT_URL } from "./../util/constants.js"

export const DiscordRouter = (app, _firedb) => {
  app.all("/discord", (req, res) => {
    /**
     * Here code is the code parameter we get after user authentication
     * The user having code parameter means they are coming from the discord oauth2 page
     * After completing signup
     */
    const code = req.query.code;
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
    const db = new Database(admin.firestore(), "discord")
    try {
      axios({
        method: "post",
        url: "https://discord.com/api/oauth2/token",
        data: new URLSearchParams({
          client_id: process.env.D_APPLICATION_ID,
          client_secret: process.env.D_CLIENT_SECRET,
          code: code,
          grant_type: "authorization_code",
          redirect_uri: REDIRECT_URL,
          scope: "identify guilds.join",
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      })
      .then(async (data) => {
          if (!data.data.access_token) {
            return res.status(502).send("BAD GATEWAY")
          }
          GetUser(data.data.access_token).then((u) => {
            let user = u;
            /**
             * It's better to save these data along with others
             */
            user.token = data.data.access_token;
            user.scope = data.data.scope;
            user.expires = data.data.expires_in;
            user.refresh_token = data.data.refresh_token;
            db.set(user.id, user);
            JoinGuild(data.data.access_token, process.env.GUILD_ID, user.id, [
              process.env.ROLE_ID,
            ])
              .then((d) => {
                /**
                 * I can put a custom html page here too
                 * If you want
                 */
                 res.status(200).redirect("/")
              })
              .catch((err) => {
                res.status(500).send("Server error")
                console.log(err);
              });
          });
        })
        .catch((err) => {
          res.status(500).send("Server Error")
          console.log(err);
        });
  });
}

import axios from "axios";

/**
 * Get current user from user token
 */
export const GetUser = (_token) => {
  return new Promise((resolve, reject) => {
    if (!_token) {
      /**
       * If no token is provided
       */
      return reject(new Error("No Token Provided"));
    }
    /**
     * Get current user
     * Reference: https://discord.com/developers/docs/resources/user#get-current-user
     */
    axios({
      method: "get",
      url: "https://discord.com/api/v9/users/@me",
      headers: {
        authorization: `Bearer ${_token}`,
      }
    })
      .then((d) => {
        /**
         * We don't need all the data
         * Just these are enough
         * No one cares about the premium flag type
         * I wish I could use typescript
         * I miss interfaces
         */
        let user = {
          id: d.data.id,
          name: d.data.username,
          tag: d.data.discriminator,
          avatar: GetAvatar({
            id: d.data.id,
            avatar: d.data.avatar,
          })
        }
        /**
         * Return the user
         */
        resolve(user)
      })
      .catch((err) => {
        /**
         * If something goes wrong
         */
        reject(err);
      })
  })
}

/**
 * Get avatar url from avatar hash
 */
const GetAvatar = (user) => {
  if (!user) { return null }
  if (!user.id) { return null }
  if (!user.avatar) { return null }
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512`
}

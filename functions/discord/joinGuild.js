import axios from "axios";

export const JoinGUild = (_token, _guild, _user, roles) => {
  return new Promise((resolve, reject) => {
    if (!_token) {
      return reject(new Error("No Token Provided"));
    }
    axios({
      method: "put",
      url: `https://discord.com/api/v9/guilds/${_guild}/members/${_user}`,
      headers: {
        authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      data: {
        access_token: _token,
        roles: roles || [],
      },
    })
      .then((d) => {
        resolve(d);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

import { discordAuth } from "./auth.js";

export default function discordRoute(app) {
  // Assign a role to a user in Discord.
  app.all("/discord", discordAuth);
}

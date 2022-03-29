import { test } from "./controller.js";

export default function discordRoute(app) {
  // A simple test function for Discord...
  app.get("/discord/test", test);
}

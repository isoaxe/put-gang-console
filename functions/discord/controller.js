import { Client, Intents } from "discord.js";

// Test function to get started with Discord.
export async function test(req, res) {
  try {
    // Create a new client instance
    const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

    // When the client is ready, run this code (only once)
    client.once("ready", () => {
      console.log("Ready!");
    });

    // Login to Discord with your client's token
    client.login(process.env.DISCORD_SECRET_TOKEN);

    res.status(200).send({ success: "Discord api accessed!" });
  } catch (err) {
    handleError(res, err);
  }
}

// Standard error helper function.
function handleError(res, err) {
  return res.status(500).send({ error: `${err}` });
}

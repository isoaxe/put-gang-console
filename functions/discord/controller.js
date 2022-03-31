import { Client, Intents } from "discord.js";
import { GANGSTA_ID, SUPER_GANGSTA_ID } from "./../util/constants.js";

// Test function to get started with Discord.
export async function role(req, res) {
  try {
    // Create a new client instance
    const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

    // When the client is ready, run this code (only once)
    client.once("ready", () => {
      console.log("Ready!");
    });

    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;

      const { commandName } = interaction;

      if (commandName === "ping") {
        await interaction.reply({ content: "pong", ephemeral: true });
      }
      if (commandName === "join") {
        const { username, tag } = interaction.user;
        const { member } = await interaction;

        member.roles.add(GANGSTA_ID);
        await interaction.reply({ content: "Access granted", ephemeral: true });
      }
    });

    // Login to Discord with your client's token
    client.login(process.env.DISCORD_SECRET_TOKEN);

    res.status(200).send({ success: "Discord bot reset!" });
  } catch (err) {
    handleError(res, err);
  }
}

// Standard error helper function.
function handleError(res, err) {
  return res.status(500).send({ error: `${err}` });
}

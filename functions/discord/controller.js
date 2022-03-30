import { Client, Intents } from "discord.js";

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
        await interaction.reply({ content: "Access granted", ephemeral: true });
      }

      /*
      const role = await interaction.options.getRole("Gangsta");
      const member = await interaction.options.getMember("testuser");
      member.roles.add(role);
      */
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

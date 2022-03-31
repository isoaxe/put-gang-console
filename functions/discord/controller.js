import admin from "firebase-admin";
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
      if (commandName === "enter") {
        const { username, tag } = interaction.user;
        const { member } = await interaction;

        const db = admin.firestore();
        const usersPath = db.collection("users");
        const findName = await usersPath.where("discord", "==", username).get();
        const findTag = await usersPath.where("discord", "==", tag).get();
        const userFromName = findName.docs[0];
        const userFromTag = findTag.docs[0];
        if (userFromTag) {
          // User already saved by tag in Firestore.
          await interaction.reply({
            content: "You already have access.",
            ephemeral: true,
          });
        } else if (!userFromName) {
          // User not found in Firestore.
          await interaction.reply({
            content: "Access denied. Set username in settings first.",
            ephemeral: true,
          });
        } else {
          // User found in Firestore.
          const userData = userFromName.data();
          const { membLvl, uid, expiryDate } = userData;
          const expiryDateMs = new Date(expiryDate).getTime();
          const now = new Date();
          if (expiryDateMs < now) {
            await interaction.reply({
              content: "Subscription expired. Please renew.",
              ephemeral: true,
            });
          } else {
            usersPath.doc(uid).set({ discord: tag }, { merge: true });
            if (membLvl === "watch") {
              member.roles.add(GANGSTA_ID);
            } else if (membLvl === "join") {
              member.roles.add(SUPER_GANGSTA_ID);
            }
            await interaction.reply({
              content: "Access granted.",
              ephemeral: true,
            });
          }
        }
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

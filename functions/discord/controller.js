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

    // Login to Discord with your client's token
    client.login(process.env.DISCORD_SECRET_TOKEN);

    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;

      const { commandName } = interaction;
      const { username, tag } = interaction.user;
      const { member } = await interaction;

      const now = new Date();
      const db = admin.firestore();
      const usersPath = db.collection("users");
      const findTag = await usersPath.where("discord", "==", tag).get();
      const userFromTag = findTag.docs[0];

      // Assign Discord role to caller and grant access.
      if (commandName === "enter") {
        const findName = await usersPath.where("discord", "==", username).get();
        const userFromName = findName.docs[0];

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
          // User found in Firestore...
          const userData = userFromName.data();
          const { membLvl, uid, expiryDate } = userData;
          const expiryDateMs = new Date(expiryDate).getTime();
          if (expiryDateMs < now) {
            // ...but subscription has expired.
            await interaction.reply({
              content: "Subscription expired. Please renew.",
              ephemeral: true,
            });
          } else {
            // ...and has paid, so set role.
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

      // Remove access for users whose subscriptions have lapsed.
      if (commandName === "purge") {
        if (!userFromTag) {
          await interaction.reply({
            content: "You're not a current subscriber, let alone the admin!",
            ephemeral: true,
          });
        } else {
          const userData = userFromTag.data();
          const { role } = userData;
          if (role !== "admin") {
            await interaction.reply({
              content: "Hey! You need to be an admin to do that.",
              ephemeral: true,
            });
          } else {
            const expiredUsers = [];
            const usersRef = await usersPath.get();
            usersRef.forEach((doc) => {
              const { discord, expiryDate } = doc.data();
              const expiryDateMs = new Date(expiryDate).getTime();
              if (expiryDateMs < now) expiredUsers.push(discord);
            });
            await interaction.reply({
              content: "Subscriptions purged.",
              ephemeral: true,
            });
          }
        }
      }
    });

    res.status(200).send({ success: "Discord bot reset!" });
  } catch (err) {
    handleError(res, err);
  }
}

// Standard error helper function.
function handleError(res, err) {
  return res.status(500).send({ error: `${err}` });
}

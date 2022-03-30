/*
 * Updates the Discord bot's slash commands.
 * This file should be executed only when a change is made to it.
 * Navigate to this directory via the CLI and run file with the 'node' command.
 */

import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { DISCORD_CLIENT_ID, DISCORD_GUILD_ID } from "./../util/constants.js";

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(
  process.env.DISCORD_SECRET_TOKEN
);

rest
  .put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID), {
    body: commands,
  })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);

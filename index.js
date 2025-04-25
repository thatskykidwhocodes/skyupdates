const keepAlive = require("./keepalive.js");
const express = require("express");
keepAlive();
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TARGET_CHANNEL_ID = "1355987599533281461"; // Replace this with the correct channel ID
const ROLE_ID_TO_PING = "1355986693131469092"; // Replace this with the correct role ID

let lastPingTime = 0; // Keeps track of the last time the bot pinged

const PING_COOLDOWN = 60 * 60 * 1000; // 60 minutes cooldown time in milliseconds

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  // Only respond if the message is in the target channel and it's not from a bot
  if (message.channel.id === TARGET_CHANNEL_ID && !message.author.bot) {
    // Get the current time
    const currentTime = Date.now();

    // Check if enough time has passed since the last ping
    if (currentTime - lastPingTime >= PING_COOLDOWN) {
      try {
        await message.channel.send(`<@&${ROLE_ID_TO_PING}>`);
        lastPingTime = currentTime; // Update the last ping time
        console.log("Pinged the role!");
      } catch (err) {
        console.error("Error pinging role:", err);
      }
    }
  }
});

client.login(process.env.TOKEN);

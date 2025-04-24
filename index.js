const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

const TARGET_CHANNEL_ID = '1355987599533281461'; // replace this
const ROLE_ID_TO_PING = '1355986693131469092';      // replace this

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.channel.id === TARGET_CHANNEL_ID && !message.author.bot) {
    try {
      await message.channel.send(`<@&${ROLE_ID_TO_PING}>`);
    } catch (err) {
      console.error('Error pinging role:', err);
    }
  }
});

client.login(process.env.TOKEN);

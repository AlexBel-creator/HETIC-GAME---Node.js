const { Client, Collection, GatewayIntentBits } = require("discord.js");
const {token} =  require("./config.json");
// const bot = new Discord.Client({intents:3276799})

// Create new client to run the bot
const client = new Client ({intents: [GatewayIntentBits.Guilds] });

bot.login(config.token)

client.once(Events.ClientsReady, readyClient => {
    console.log (`Ready! ${readyClient.user.tag}`);
}) 
const { Client, Collection, GatewayIntentBits, Events } = require("discord.js");
const {token} =  require("./config.json");
// const bot = new Discord.Client({intents:3276799})

// Créez une nouvelle instance du client pour faire fonctionner le bot
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


// Utilisez la variable 'client' pour se co'
client.login(token);

client.once(Events.ClientReady, () => {
    console.log(`Prêt! Connecté en tant que ${client.user.tag}`);
});
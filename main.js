const { Client, Collection, GatewayIntentBits, Events, InteractionType } = require("discord.js");
const { token } = require("./config.json");
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

// Configuration de la base de données
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite'
});
  
// Définition du modèle Tags
const Tags = sequelize.define('tags', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    description: Sequelize.TEXT,
    username: Sequelize.STRING,
    usage_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    }
});
  

// Initialisation du client Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection(); // Initialiser avant de charger les commandes

// Chargement des commandes
const commandFiles = fs.readdirSync('./commands/database').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/database/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    // Synchronize the Tags model with the database
    Tags.sync()
        .then(() => {
            console.log('Database Tags successfully synced!');
        })
        .catch(console.error); // Log any errors that occur during syncing

    console.log(`Connected as ${client.user.tag}!`);
});
  


client.on(Events.InteractionCreate, async interaction => {
    // Vérifiez si l'interaction est une commande de chat
    if (interaction.type !== InteractionType.ApplicationCommand) return;

    const { commandName } = interaction;

    // Vérifiez si la commande exécutée est 'bender_addtag'
    if (commandName === 'bender_addtag') {
        const tagName = interaction.options.getString('name');
        const tagDescription = interaction.options.getString('description');

        try {
            // Insère un nouveau tag dans la base de données
            const tag = await Tags.create({
                name: tagName,
                description: tagDescription,
                username: interaction.user.username
            });

            // Répond à l'interaction
            await interaction.reply(`Tag ${tag.name} ajouté.`);
        } catch (error) {
            // Gérer les erreurs d'insertion, comme les contraintes uniques, etc.
            if (error.name === 'SequelizeUniqueConstraintError') {
                await interaction.reply('Ce tag existe déjà.');
            } else {
                console.error(error);
                await interaction.reply('Une erreur est survenue lors de la création du tag.');
            }
        }
    }
});
  
// Utilisez la variable 'client' pour se co'
client.login(token)
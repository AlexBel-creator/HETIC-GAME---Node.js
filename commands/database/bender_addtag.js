const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bender_addtag')
        .setDescription('Ajoute un tag à la base de données.')
        .addStringOption(option => 
            option.setName('name')
                .setDescription('Le nom du tag')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('description')
                .setDescription('La description du tag')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('active')
                .setDescription('Si le tag est actif ou non')
                .setRequired(false)), // L'option est facultative
    async execute(interaction, { Tags }) {
        const name = interaction.options.getString('name');
        const description = interaction.options.getString('description');
        const active = interaction.options.getBoolean('active') || false; // Utilisez false comme valeur par défaut

        try {
            // Créez le tag avec Sequelize
            const tag = await Tags.create({
                name: name,
                description: description,
                usage_count: 0, // Utilisez la valeur par défaut pour usage_count si nécessaire
                active: active // Utilisez le booléen récupéré pour le champ 'active' du tag
            });

            // Répond à l'interaction avec le résultat
            await interaction.reply(`Tag "${name}" ajouté avec succès! ${active ? 'Il est actif.' : 'Il est inactif.'}`);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return interaction.reply('Ce tag existe déjà.');
            }
            console.error(error);
            return interaction.reply('Une erreur est survenue lors de l\'ajout du tag.');
        }
    }
};

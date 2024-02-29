const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { wait } = require('@discordjs/util');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bender_user')
    .setDescription('Provides information about the user.')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers) // Nécessite la permission de bannir pour utiliser la commande
    .setDMPermission(false) // Ne peut pas être utilisé en DM
    .addBooleanOption(option =>
      option.setName('ephemeral')
        .setDescription('Whether or not the follow-up message should be ephemeral')
        .setRequired(false)) // L'option est facultative
  ,
  async execute(interaction) {
    // Répondre à l'interaction initiale
    await interaction.reply(
      `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`
    );

    // Récupérer la valeur de l'option booléenne
    const isEphemeral = interaction.options.getBoolean('ephemeral') || false;

    // Attendre 2000 millisecondes avant d'envoyer un message de suivi
    await wait(2000);

    // Envoyer un message de suivi basé sur l'option booléenne
    await interaction.followUp({ content: 'This is a follow-up message!', ephemeral: isEphemeral });
  },
};

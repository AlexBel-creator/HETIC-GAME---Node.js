const { SlashCommandBuilder } = require('discord.js');
const { wait } = require('@discordjs/util');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bender_user')
    .setDescription('Provides information about the user.'),
  async execute(interaction) {
    // Répondre à l'interaction initiale
    await interaction.reply(
      `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`
    );

    // Attendre 2000 millisecondes avant d'envoyer un message de suivi
    await wait(2000);
    await interaction.followUp('This is a follow-up message!');

    // Attendre encore et envoyer un message éphémère
    await wait(2000);
    await interaction.followUp({ content: 'This is an ephemeral message, visible only to you!', ephemeral: true });
  },
};
const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionsBitField, PermissionFlagsBits  } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
  structure: new SlashCommandBuilder()
    .setName('anti-link')
    .setDescription('Setup the anti-link system.')
   .addSubcommand(command => 
                   command
                   .setName('setup')
                   .setDescription('Blocks any links sent in the server.')),


run: async (client, interaction) => {
    
}}
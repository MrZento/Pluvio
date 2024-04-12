const { ChatInputCommandInteraction, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, EmbedBuilder, Guild } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('restart')
        .setDescription('dev only'),
        options: {
            developers: true,
        },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const res = new EmbedBuilder()
        .setDescription('Restarting the bot, estimated 15 seconds to finish!')
        .setColor('Orange')
        
        await interaction.reply({embeds: [res], ephemeral: true})
        process.exit();
        await wait(1_000);
        client.login(process.env.CLIENT_TOKEN);
    }
};

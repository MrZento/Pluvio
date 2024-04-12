const { MessageContextMenuCommandInteraction, ContextMenuCommandBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new ContextMenuCommandBuilder()
        .setName('Translate Message')
        .setType(3),
    /**
     * @param {ExtendedClient} client 
     * @param {MessageContextMenuCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        await interaction.reply({
            content: 'Hello message context command!'
        });

    }
};
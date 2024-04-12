const { ModalSubmitInteraction, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'myModal',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: async (client, interaction) => {

        const nameInput = interaction.fields.getTextInputValue('name');

        const applicationpreview = new EmbedBuilder()
        .setTitle(`${interaction.member.displayName}'s Application`)
        .setDescription(`your application will be reviewed soon, please sit tight. Hey **${nameInput}**, what's up?`)

		await interaction.reply({embeds: [applicationpreview], ephemeral: true})
    }
};
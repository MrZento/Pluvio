const { StringSelectMenuInteraction, ModalSubmitInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, getTextInputValue} = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'example-select',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {

        const value = interaction.values[0];

        const modal = new ModalBuilder()
			.setCustomId('myModal')
			.setTitle(`${value}`);


        const name = new TextInputBuilder()
			.setCustomId('name')
		    // The label is the prompt the user sees for this input
			.setLabel("What's your name?")
			.setPlaceholder("VisionVix")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);

		const reason = new TextInputBuilder()
			.setCustomId('reason')
			.setLabel(`Why do you want to ${value}`)
			.setPlaceholder("Because I like moderating servers.")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph);

		const contribute = new TextInputBuilder()
			.setCustomId('contribute')
			.setLabel(`How will you contribute to us as this role?`)
			.setPlaceholder("Because I like moderating servers.")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph);


		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder().addComponents(name);
		const secondActionRow = new ActionRowBuilder().addComponents(reason);
		const ThirdActionRow = new ActionRowBuilder().addComponents(contribute);


		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow, ThirdActionRow);

		// Show the modal to the user
		await interaction.showModal(modal);
    }
};
// ` 
// `${value}`
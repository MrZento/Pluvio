const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),
    options: {
        cooldown: 5000
    },
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {

       const embed = new EmbedBuilder()
        .setTitle("Pong!")
        .addFields({name: '**Latency**', value: `\`\`\`ini\n[ ${Date.now() - interaction.createdTimestamp}ms ]\n\`\`\``, inline: true},
        {name: '**API Latency**', value: `\`\`\`ini\n[ ${Math.round(client.ws.ping)}ms ]\n\`\`\``, inline: true})
        .setTimestamp()
  
        await interaction.reply({embeds: [embed]})

    }
};

const { Message, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: {
        name: 'ping',
        description: 'Replies with Pong!',
        aliases: ['p'],
        permissions: 'Administrator',
        cooldown: 5000
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message, args, interaction) => {

         const embed = new EmbedBuilder()
        .setTitle("Pong!")
        .addFields({name: '**Latency**', value: `\`\`\`ini\n[ ${Date.now() - message.createdTimestamp}ms ]\n\`\`\``, inline: true},
        {name: '**API Latency**', value: `\`\`\`ini\n[ ${Math.round(client.ws.ping)}ms ]\n\`\`\``, inline: true})
        .setTimestamp()
  
        await message.reply({embeds: [embed]})

    }
};

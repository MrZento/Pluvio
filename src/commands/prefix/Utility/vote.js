const { Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: {
        name: 'vote',
        description: 'Vote for the bot',
        aliases: ['v'],
        permissions: 'Administrator',
        cooldown: 5000
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message<true>} message 
     * @param {string[]} args 
     */
    run: async (client, message, args, interaction) => {
        
        const topgg = new ButtonBuilder()
        .setLabel('Top.gg')
        .setStyle(ButtonStyle.Link)
        .setURL('https://top.gg/bot/1217220951171928214/vote')
        .setEmoji('🔗')
        
        const invite = new ButtonBuilder()
        .setLabel('Invite')
        .setStyle(ButtonStyle.Link)
        .setURL('https://discord.com/oauth2/authorize?client_id=1217220951171928214&permissions=0&scope=bot')
        .setEmoji('🔗')
        
        const row = new ActionRowBuilder()
        .addComponents(topgg, invite)

         const embed = new EmbedBuilder()
        .setTitle("Vote the bot!")
        .setDescription("Voting for our bot helps us in improving the quality of Pluvio! We also love voters..")
        .setColor("DarkVividPink")
  
        await message.reply({embeds: [embed], components: [row]})

    }
};

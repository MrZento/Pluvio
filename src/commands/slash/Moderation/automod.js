const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, PermissionsBitField, PermissionFlagsBits  } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
  structure: new SlashCommandBuilder()
    .setName('automod')
    .setDescription('Setup the automod system.')
   .addSubcommand(command => 
                   command
                   .setName('flagged-words')
                   .setDescription('Block profanity, sexual content and slurs'))
   .addSubcommand(command =>
                   command
                   .setName('spam-messages')
                   .setDescription('Block messages suspected of spam')
                  )
    .addSubcommand(command =>
                   command
                   .setName('mention-spam')
                   .setDescription('Block messages a certain amount of mentions')
                   .addIntegerOption(option => 
                      option
                      .setName('number')
                      .setDescription('The number of mentions required to block a message')
                      .setRequired(true)))
   .addSubcommand(command =>
                   command
                   .setName('keyword')
                   .setDescription('Block a given keyword in the server')
                   .addStringOption(option =>
                                    option
                                    .setName('word')
                                    .setDescription('The word you want to block')
                                    .setRequired(true))),
    
    
        run: async (client, interaction) => {

        
        const { guild, options } = interaction;
        const sub = interaction.options.getSubcommand()
            
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({content: 'You do not have permission to setup automod within this server!', ephemeral: true})
        
        switch(sub) {
                case 'flagged-words':
                
                await interaction.reply({ content: 'Loading your automod rule...'});
                
                const rule = await guild.autoModerationRules.create({
                    name: 'Block profanity, Sexual content and slurs | By Pluvio',
                    creatorId: '1217220951171928214',
                    enabled: true,
                    eventType: 1,
                    triggerType: 4,
                    triggerMetadata:
                        {
                            presets: [1, 2, 3]
                        },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                                customMessage: "this message was prevented by Pluvio Bot's AutoModeration"
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.editReply({content: `${err}`});
                    }, 2000)
                })
                
                setTimeout(async () => {
                    if (!rule) return;
                    
                    const embed = new EmbedBuilder()
                    .setColor('Green')
                    .setDescription(':white_check_mark: Your Automod rule has been created, all swears will be stopped by Pluvio Bot!')
                    
                    await interaction.editReply({content: '', embeds: [embed]});
                }, 3000)
                
                break;
                
            case 'keyword':
                
                
                await interaction.reply({ content: 'Loading your automod rule...'});
                const word = interaction.options.getString('word');
                
                
                const rule2 = await guild.autoModerationRules.create({
                    name: `Prevent the word "${word}" from being used | By Pluvio`,
                    creatorId: '1217220951171928214',
                    enabled: true,
                    eventType: 1,
                    triggerType: 1,
                    triggerMetadata:
                        {
                            keywordFilter: [`${word}`]
                        },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                                customMessage: "this message was prevented by Pluvio Bot's AutoModeration"
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.editReply({content: `${err}`});
                    }, 2000)
                })
                
                setTimeout(async () => {
                    if (!rule2) return;
                    
                    const embed2 = new EmbedBuilder()
                    .setColor('Green')
                    .setDescription(`:white_check_mark: Your Automod rule has been created, all messages containing the word "${word}" will be deleted by Pluvio Bot!`)
                    
                    await interaction.editReply({content: '', embeds: [embed2]});
                }, 3000)
                
                break;
                
            case 'spam-messages':
                
                await interaction.reply({ content: 'Loading your automod rule...'});
                
                const rule3 = await guild.autoModerationRules.create({
                    name: 'Prevent spam messages | By Pluvio',
                    creatorId: '1217220951171928214',
                    enabled: true,
                    eventType: 1,
                    triggerType: 3,
                    triggerMetadata:
                        {
                            // mentionTotalLimit: number
                        },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                                customMessage: "this message was prevented by Pluvio Bot's AutoModeration"
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.editReply({content: `${err}`});
                    }, 2000)
                })
                
                setTimeout(async () => {
                    if (!rule3) return;
                    
                    const embed3 = new EmbedBuilder()
                    .setColor('Green')
                    .setDescription(':white_check_mark: Your Automod rule has been created, all swears will be stopped by Pluvio Bot!')
                    
                    await interaction.editReply({content: '',embeds: [embed3]});
                }, 3000)
        
                break;
                
            case 'mention-spam':
        
        await interaction.reply({ content: 'Loading your automod rule...'});
                
        const number = interaction.options.getInteger('number');

     
       const rule4 = await guild.autoModerationRules.create({
                    name: 'Prevent spam mentions | By Pluvio',
                    creatorId: '1217220951171928214',
                    enabled: true,
                    eventType: 1,
                    triggerType: 5,
                    triggerMetadata:
                        {
                            mentionTotalLimit: number
                        },
                    actions: [
                        {
                            type: 1,
                            metadata: {
                                channel: interaction.channel,
                                durationSeconds: 10,
                                customMessage: "this message was prevented by Pluvio Bot's AutoModeration"
                            }
                        }
                    ]
                }).catch(async err => {
                    setTimeout(async () => {
                        console.log(err);
                        await interaction.editReply({content: `${err}`});
                    }, 2000)
                })
                
                setTimeout(async () => {
                    if (!rule4) return;
                    
                    const embed4 = new EmbedBuilder()
                    .setColor('Green')
                    .setDescription(':white_check_mark: Your Automod rule has been created, all messages suspected of mention spam will be deelted by Pluvio Bot!')
                    
                    await interaction.editReply({content: '', embeds: [embed4]});
                }, 3000)
        } 
    }
 }
const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ms = require('ms');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Timeout a user.')
    .addUserOption((opt) =>
            opt.setName('user')
                .setDescription('The user you want to timeout.')
                .setRequired(true))
    .addStringOption((option) =>
            option
                .setName("duration")
                .setDescription("Timeout duration (30m, 1h, 1 day).")
                .setRequired(true)
        )
      .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("The reason for the timeout.")
                .setRequired(false)
        ),


  permissionsRequired: [PermissionFlagsBits.MuteMembers],
  botPermissions: [PermissionFlagsBits.MuteMembers],

 /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

 run: async (client, interaction) => {
    const mentionable = interaction.options.get('user').value;
    const duration = interaction.options.get('duration').value; // 1d, 1 day, 1s 5s, 5m
    const reason = interaction.options.get('reason')?.value || 'No reason provided';

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(mentionable);
    if (!targetUser) {
      const notexist = new EmbedBuilder()
      .setDescription("That user doesn't exist in this server.")
      .setColor("Red")
      
    await interaction.editReply({embeds: [notexist]});
      return;
    }

    if (targetUser.user.bot) {
      const nobot = new EmbedBuilder()
      .setDescription("I can't timeout a bot!")
      .setColor("Red")
      
    await interaction.editReply({embeds: [nobot]});
      return;
    }

    const msDuration = ms(duration);
    if (isNaN(msDuration)) {
      const invalid = new EmbedBuilder()
      .setDescription("Please provide a valid timeout duration!")
      .setColor("Red")
      
    await interaction.editReply({embeds: [invalid]});
      return;
    }

    if (msDuration < 5000 || msDuration > 2.419e9) {
      const shortlong = new EmbedBuilder()
      .setDescription("Timeout duration can't be less than 5 seconds and more than 28 days!")
      .setColor("Red")
      
    await interaction.editReply({embeds: [shortlong]});
      return;
    }
     
     if (targetUser.id === interaction.guild.ownerId) {
      const owner = new EmbedBuilder()
        .setDescription("I can't timeout that user because they're the server owner.")
        .setColor("Red")
        
      await interaction.editReply({embeds: [owner]});
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
    const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the cmd
    const botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot

    if (targetUserRolePosition >= requestUserRolePosition) {
      const highersame = new EmbedBuilder()
      .setDescription("You can't kick that user because they have the same/higher role than you.")
      .setColor("Red")
    await interaction.editReply({embeds: [highersame]});
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      const samehigher = new EmbedBuilder()
        .setDescription("I can't kick that user because they have the same/higher role than me.")
        .setColor("Red")

      await interaction.editReply({embeds: [samehigher]});
      return;
    }

    // Timeout the user
    try {
      const { default: prettyMs } = await import('pretty-ms');

      if (targetUser.isCommunicationDisabled()) {
        await targetUser.timeout(msDuration, reason);
        const update = new EmbedBuilder()
        .setDescription(` Updated ${targetUser}'s timeout to ${prettyMs(msDuration, { verbose: true })} || ${reason}`)
        .setColor("Orange")
        
      await interaction.editReply({embeds: [update]});
        return;
      }

      await targetUser.timeout(msDuration, reason);
      const muted = new EmbedBuilder()
        .setDescription(`Muted ${targetUser} || ${reason}`)
        .setColor("#0d7c3b")
        
      await interaction.editReply({embeds: [muted]});
    } catch (error) {
      console.log(`There was an error when timing out: ${error}`);
    }
  }
}
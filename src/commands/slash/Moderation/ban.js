const { client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('ban someone from the server')
    .addUserOption((opt) =>
            opt.setName('user')
                .setDescription('The user to ban')
                .setRequired(true))
      .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("The reason to ban the user")
                .setRequired(false)
        ),
                   
    permissionsRequired: [PermissionFlagsBits.BanMembers],
     botPermissions: [PermissionFlagsBits.BanMembers],
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

    run: async (client, interaction) => {
    const targetUserId = interaction.options.get('user').value;
    const reason =
      interaction.options.get('reason')?.value || 'No reason provided';

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
        
        const notexist = new EmbedBuilder()
        .setDescription("That user doesn't exist in this server.")
        .setColor("Red")
        
      await interaction.editReply({embeds: [notexist]});
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
        
                const owner = new EmbedBuilder()
        .setDescription("You can't ban that user because they're the server owner.")
        .setColor("Red")
        
      await interaction.editReply({embeds: [owner]});
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
    const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the cmd
    const botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot

    if (targetUserRolePosition >= requestUserRolePosition) {
        
        const highersame = new EmbedBuilder()
        .setDescription("You can't ban that user because they have the same/higher role than you.")
        .setColor("Red")
      await interaction.editReply({embeds: [highersame]});
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
        
        const samehigher = new EmbedBuilder()
        .setDescription("I can't ban that user because they have the same/higher role than me.")
        .setColor("Red")
        
      await interaction.editReply({embeds: [samehigher]});
      return;
    }

    // ban the targetUser
    try {
        
        const banned = new EmbedBuilder()
        .setDescription(`Banned ${targetUser} || ${reason}`)
        .setColor("#0d7c3b")
        
      await interaction.editReply({embeds: [banned]});
        
      await targetUser.ban({ reason });
        
        
    } catch (error) {
      console.log(`There was an error when banning: ${error}`);
    }
  }
}
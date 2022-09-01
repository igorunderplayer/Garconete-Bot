import { CommandRun } from '@structures/Command'
import { Colors, EmbedBuilder, SlashCommandSubcommandBuilder } from 'discord.js'

import NekoClient from 'nekos.life'
const nekos = new NekoClient()

export const command = new SlashCommandSubcommandBuilder()
  .setName('kiss')
  .setDescription('kiss a user')
  .addStringOption(option =>
    option
      .setName('user')
      .setDescription('user that will receive a nice kiss')
      .setRequired(true)
  )

export const run = async ({ client, interaction, t }: CommandRun) => {
  let replied = false
  const user = interaction.options.getUser('user')

  // "easter egg"
  if (user.id === client.user.id) {
    await interaction.reply(':flushed:')
    replied = true
  }

  // const gif = gifs[Math.floor(Math.random() * gifs.length)]
  const kiss = await nekos.kiss()

  const embed = new EmbedBuilder()
    .setColor(Colors.Purple)
    .setImage(kiss.url)
    .setDescription(t('action', 'kiss.reply', interaction.locale, {
      author: interaction.user,
      user
    }))

  if (replied) {
    return interaction.editReply({
      embeds: [embed]
    })
  } else {
    return interaction.reply({
      embeds: [embed]
    })
  }
}

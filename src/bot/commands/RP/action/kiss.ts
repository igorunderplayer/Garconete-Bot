import { CommandRun } from '@structures/Command.js'
import GarconeteSubCommandBuilder from '@structures/GarconeteSubCommandBuilder.js'
import { Colors, EmbedBuilder } from 'discord.js'

import NekoClient from 'nekos.life'
const nekos = new NekoClient()

export const command = new GarconeteSubCommandBuilder()
  .setName('kiss')
  .setDescription('kiss a user')
  .setRunMethod(run)
  .addUserOption(option =>
    option
      .setName('user')
      .setDescription('user that will receive a nice kiss')
      .setRequired(true)
  )

async function run ({ client, interaction, t }: CommandRun) {
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

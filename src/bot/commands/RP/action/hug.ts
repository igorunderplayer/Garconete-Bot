import { CommandRun } from '@structures/Command'

import { Colors, EmbedBuilder, SlashCommandSubcommandBuilder } from 'discord.js'
import NekoClient from 'nekos.life'
const nekos = new NekoClient()

export const command = new SlashCommandSubcommandBuilder()
  .setName('hug')
  .setDescription('hugs a user')
  .addStringOption(option =>
    option
      .setName('user')
      .setDescription('user who will receive a hug')
      .setRequired(true)
  )

export const run = async ({ client, interaction, t }: CommandRun) => {
  const user = interaction.options.getUser('user')

  const hug = await nekos.hug()

  const embed = new EmbedBuilder()
    .setColor(Colors.Yellow)
    .setImage(hug.url)
    .setDescription(t('action', 'hug.reply', interaction.locale, {
      author: interaction.user,
      user
    }))

  interaction.reply({
    embeds: [embed]
  })
}

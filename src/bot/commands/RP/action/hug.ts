import { CommandRun } from '@structures/Command'
import GarconeteSubCommandBuilder from '@structures/GarconeteSubCommandBuilder'

import { Colors, EmbedBuilder } from 'discord.js'
import NekoClient from 'nekos.life'
const nekos = new NekoClient()

export const command = new GarconeteSubCommandBuilder()
  .setName('hug')
  .setDescription('hugs a user')
  .setRunMethod(run)
  .addUserOption(option =>
    option
      .setName('user')
      .setDescription('user who will receive a hug')
      .setRequired(true)
  )

async function run ({ client, interaction, t }: CommandRun) {
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

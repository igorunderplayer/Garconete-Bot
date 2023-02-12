import { CommandRun } from '@structures/Command.js'
import GarconeteSubCommandBuilder from '@structures/GarconeteSubCommandBuilder.js'

import NekoClient from 'nekos.life'
const nekos = new NekoClient()

export const command = new GarconeteSubCommandBuilder()
  .setName('owoify')
  .setDescription('owo?')
  .setRunMethod(run)
  .addStringOption(option =>
    option.setName('input')
      .setDescription('text to be owoified')
      .setRequired(true)
  )

async function run ({ client, interaction, t }: CommandRun) {
  const text = interaction.options.get('input', true).value as string
  const { owo } = await nekos.OwOify({
    text
  })

  await interaction.reply({
    content: owo,
    allowedMentions: { parse: [] }
  })
}

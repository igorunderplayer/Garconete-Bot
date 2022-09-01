import { CommandRun } from '@structures/Command'
import { SlashCommandSubcommandBuilder } from 'discord.js'

import NekoClient from 'nekos.life'
const nekos = new NekoClient()

export const command = new SlashCommandSubcommandBuilder()
  .setName('owoify')
  .setDescription('owo?')
  .addStringOption(option =>
    option.setName('input')
      .setDescription('text to be owoified')
      .setRequired(true)
  )

export const run = async ({ client, interaction, t }: CommandRun) => {
  const text = interaction.options.get('input', true).value as string
  const { owo } = await nekos.OwOify({
    text
  })

  await interaction.reply({
    content: owo,
    allowedMentions: { parse: [] }
  })
}

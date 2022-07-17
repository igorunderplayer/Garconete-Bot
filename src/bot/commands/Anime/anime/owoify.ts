import GarconeteClient from '@structures/Client'
import Command, { CommandRun } from '@structures/Command'
import { ApplicationCommandOptionType } from 'discord.js'

import NekoClient from 'nekos.life'
const nekos = new NekoClient()

export default class OwOify extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'owoify',
      description: 'OwO',
      type: ApplicationCommandOptionType.Subcommand,
      options: [{
        type: ApplicationCommandOptionType.String,
        name: 'input',
        description: 'text to be owoified?',
        required: true
      }]
    })

    this.client = client
  }

  async run ({ interaction, t }: CommandRun) {
    const text = interaction.options.get('input', true).value as string
    const { owo } = await nekos.OwOify({
      text
    })

    await interaction.reply({
      content: owo,
      allowedMentions: { parse: [] }
    })
  }
}

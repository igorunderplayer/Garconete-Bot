import GarconeteClient from '@structures/Client'
import Command, { CommandRun } from '@structures/Command'

import NekoClient from 'nekos.life'
const nekos = new NekoClient()

export default class OwOify extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'owoify',
      description: 'OwO',
      type: 'SUB_COMMAND',
      options: [{
        type: 'STRING',
        name: 'input',
        description: 'text to be owoified?',
        required: true
      }]
    })

    this.client = client
  }

  async run ({ interaction, t }: CommandRun) {
    const text = interaction.options.getString('input')
    const { owo } = await nekos.OwOify({
      text
    })

    await interaction.reply({
      content: owo,
      allowedMentions: { parse: [] }
    })
  }
}

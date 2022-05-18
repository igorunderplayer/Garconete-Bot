import Command, { CommandRun } from '@structures/Command'
import GarconeteClient from '@structures/Client'

export default class Kiss extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'kiss',
      description: 'kiss a user',
      type: 'SUB_COMMAND',
      options: [{
        name: 'user',
        required: true,
        description: 'user that will receive a nice kiss',
        type: 'USER'
      }]
    })

    this.client = client
  }

  async run ({ interaction, t } : CommandRun) {
    const user = interaction.options.getUser('user')
    // "easter egg"
    if (user.id === this.client.user.id) {
      interaction.reply(':flushed:')
    }

    const reply = t(this.name, 'kiss.reply', interaction.locale, {
      author: interaction.user,
      user
    })

    interaction.reply(reply)
  }
}

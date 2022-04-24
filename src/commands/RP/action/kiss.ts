import Command from '../../../structures/Command'
import GarconeteClient from '../../../structures/Client'
import { CommandInteraction } from 'discord.js'
import applyPlaceholders from '../../../Util/placeholders'

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

  async run (interaction: CommandInteraction) {
    const user = interaction.options.getUser('user')
    // "easter egg"
    if (user.id === this.client.user.id) {
      interaction.reply(':flushed:')
    }

    const reply = applyPlaceholders(
      {
        author: interaction.user,
        user
      },
      this.client.getCommandPhrase('action', 'hug.reply', interaction.locale)
    )

    interaction.reply(reply)
  }
}

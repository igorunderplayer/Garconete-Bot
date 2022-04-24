import { CommandInteraction } from 'discord.js'
import GarconeteClient from '../../../structures/Client'
import Command from '../../../structures/Command'
import applyPlaceholders from '../../../Util/placeholders'

export default class Hug extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'hug',
      description: 'hugs a user',
      type: 'SUB_COMMAND',
      options: [{
        name: 'user',
        description: 'user to get a hug',
        required: true,
        type: 'USER'
      }]
    })

    this.client = client
  }

  async run (interaction: CommandInteraction) {
    const user = interaction.options.getUser('user')

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

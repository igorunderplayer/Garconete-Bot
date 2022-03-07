import { CommandInteraction } from 'discord.js'
import GarconeteClient from '../../../structures/Client'
import Command from '../../../structures/Command'

export default class Hug extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'hug',
      description: 'abasa um user',
      type: 'SUB_COMMAND',
      options: [{
        name: 'member',
        description: 'usuario',
        required: true,
        type: 'USER'
      }]
    })

    this.client = client
  }

  async run (interaction: CommandInteraction) {
    const user = interaction.options.getUser('member')

    interaction.reply(`${interaction.user} abrasou ${user.username}`)
  }
}

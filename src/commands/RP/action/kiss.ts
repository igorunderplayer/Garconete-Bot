import Command from '../../../structures/Command'
import GarconeteClient from '../../../structures/Client'
import { CommandInteraction } from 'discord.js'

export default class Kiss extends Command {
  constructor(client: GarconeteClient) {
    super({
      name: 'kiss',
      description: 'beja um usuario',
      type: 'SUB_COMMAND',
      options: [{
        name: 'user',
        required: true,
        description: 'usuario pra beija',
        type: 'USER'
      }]
    })

    this.client = client
  }

  async run(interaction: CommandInteraction) {
    const user = interaction.options.getUser('user')
    // "easter egg"
    if(user.id === this.client.user.id) {
      interaction.reply(`:flushed: ${interaction.user} acabou de me dar um beij....`)
      return
    }

    interaction.reply(`${interaction.user} bejou ${user.username}`)
  }
}

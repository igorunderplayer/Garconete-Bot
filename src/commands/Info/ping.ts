import { CommandInteraction } from 'discord.js'
import Garconete from '../../structures/Client'
import Command from '../../structures/Command'

export default class Ping extends Command {
  constructor (client: Garconete) {
    super({
      name: 'ping',
      description: 'manda a minha latencia'
    })

    this.client = client
  }

  async run (interaction: CommandInteraction) {
    interaction.reply('minha latencia')
  }
}

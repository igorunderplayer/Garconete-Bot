import { CommandInteraction } from 'discord.js'
import GarconeteClient from '../../structures/Client'
import Command from '../../structures/Command'

export default class Ping extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'ping',
      description: 'manda a minha latencia'
    })

    this.client = client
  }

  async run (interaction: CommandInteraction) {
    console.log('ping')
    interaction.reply('minha latencia')
  }
}

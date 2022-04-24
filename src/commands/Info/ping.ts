import { CommandInteraction } from 'discord.js'
import GarconeteClient from '../../structures/Client'
import Command from '../../structures/Command'
import placeholders from '../../util/placeholders'

export default class Ping extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'ping',
      description: 'manda a minha latencia'
    })

    this.client = client
  }

  async run (interaction: CommandInteraction) {
    const locale = interaction.locale
    const phrase = this.client.getCommandPhrase(this.name, 'reply', locale)
    const reply = placeholders({
      wsLatency: ~~(this.client.ws.ping)
    }, phrase)
    interaction.reply(reply)
  }
}

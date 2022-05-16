import GarconeteClient from '../../structures/Client'
import Command, { CommandRun } from '../../structures/Command'

export default class Ping extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'ping',
      description: 'manda a minha latencia'
    })

    this.client = client
  }

  async run ({ interaction, t } : CommandRun) {
    const reply = t(this.name, 'reply', interaction.locale, {
      wsLatency: ~~(this.client.ws.ping)
    })
    interaction.reply(reply)
  }
}

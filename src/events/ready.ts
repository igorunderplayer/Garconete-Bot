import { ClientEvents } from 'discord.js'
import GarconeteClient from '../structures/Client'
import Event from '../structures/Event'

export default class Ready extends Event<'ready'> {
  trigger: keyof ClientEvents = 'ready'

  constructor (client: GarconeteClient) {
    super()
    this.client = client
  }

  async handle () {
    await this.client.loadCommands()
    console.log(`[Bot] Ready! | Logged as ${this.client.user.tag} (${this.client.user.id})`)

    this.client.user.setStatus('idle')
    this.client.user.setActivity({
      name: 'sexo',
      type: 'WATCHING'
    })
  }
}

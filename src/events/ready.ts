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
    console.log('[Bot] Ready!')
  }
}

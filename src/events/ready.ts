import { ClientEvents } from 'discord.js'
import { prisma } from '../prisma'
import GarconeteClient from '../structures/Client'
import Event from '../structures/Event'

export default class Ready extends Event<'ready'> {
  trigger: keyof ClientEvents = 'ready'

  constructor (client: GarconeteClient) {
    super()
    this.client = client
  }

  async handle () {
    console.log(`[Bot] Ready! | Logged as ${this.client.user.tag} (${this.client.user.id})`)
    console.log('[Bot] Loading commands...')

    const blacklistUserIds = await prisma.user.findMany({
      where: {
        blacklisted: true
      },
      select: {
        id: true
      }
    })

    this.client.blacklistedIds = blacklistUserIds.map(user => user.id)

    await this.client.loadCommands({
      ignoreCommandDirectory: ['MessageCommands']
    })

    this.client.user.setStatus('idle')
    this.client.user.setActivity({
      name: 'sexo',
      type: 'WATCHING'
    })
  }
}

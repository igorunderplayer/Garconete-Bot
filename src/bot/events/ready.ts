import Event from '@structures/Event'
import GarconeteClient from '@structures/Client'
import { ActivityType, ClientEvents, OAuth2Scopes, PermissionFlagsBits } from 'discord.js'
import { prisma } from '../../prisma'

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

    await this.client.deployCommands()

    this.client.user.setStatus('online')
    this.client.user.setActivity({
      name: 'you',
      type: ActivityType.Watching
    })

    const invite = this.client.generateInvite({
      scopes: [
        OAuth2Scopes.ApplicationsCommands,
        OAuth2Scopes.Bot
      ],
      permissions: [
        PermissionFlagsBits.Administrator
      ]
    })

    console.log(`Bot | ${this.client.user.tag} ready!`)
    console.log(`Bot | Invite-me: ${invite}`)
  }
}

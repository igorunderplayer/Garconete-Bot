import Event from '@structures/Event.js'
import GarconeteClient from '@structures/Client.js'
import { ActivityType, ClientEvents, OAuth2Scopes, PermissionFlagsBits } from 'discord.js'
import { prisma } from '../../prisma.js'

export default class Ready extends Event<'ready'> {
  trigger: keyof ClientEvents = 'ready'

  constructor (client: GarconeteClient) {
    super()
    this.client = client
  }

  async handle () {
    console.log(`[Bot] Ready! | Logged as ${this.client.user.tag} (${this.client.user.id})`)
    console.log('[Bot] Loading commands...')

    const blacklistUser = await prisma.user.findMany({
      where: {
        blacklisted: true
      },
      select: {
        id: true
      }
    })

    const blacklistedUsersIds = blacklistUser.map(user => user.id)

    this.client.blacklistedIds = new Set(blacklistedUsersIds)

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

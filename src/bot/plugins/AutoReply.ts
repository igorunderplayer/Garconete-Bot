import ClientPlugin from '@structures/ClientPlugin'
import GarconeteClient from '@structures/Client'
import { Message, PartialMessage } from 'discord.js'

import { prisma } from '../../prisma'

export default class AutoReply extends ClientPlugin {
  constructor (client: GarconeteClient) {
    super({
      client,
      identifier: 'autoReply'
    })
  }

  async onMessageCreate (message: Message) {
    const reply = await prisma.autoReply.findFirst({
      where: {
        guildId: { equals: message.guild.id },
        trigger: { equals: message.content }
      }
    })

    if (!reply) return

    message.channel.send(reply.response)
  }

  onMessageDelete (_message: Message | PartialMessage) {}
}

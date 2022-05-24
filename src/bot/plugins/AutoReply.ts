import ClientPlugin from '@structures/ClientPlugin'
import GarconeteClient from '@structures/Client'
import { Collection, Message, PartialMessage } from 'discord.js'

import { prisma } from '../../prisma'

interface ReplyData {
  trigger: string
  response: string
}

export default class AutoReply extends ClientPlugin {
  public replyCache: Collection<string, Collection<string, ReplyData>>
  constructor (client: GarconeteClient) {
    super({
      client,
      identifier: 'autoReply'
    })

    this.replyCache = new Collection()
  }

  async onSetup () {
    const allReplies = await prisma.autoReply.findMany()

    for (const reply of allReplies) {
      let guildReplyCollection = this.replyCache.get(reply.guildId)

      if (!guildReplyCollection) {
        this.replyCache.set(reply.guildId, new Collection())
        guildReplyCollection = this.replyCache.get(reply.guildId)
      }

      guildReplyCollection.set(reply.id, {
        trigger: reply.trigger,
        response: reply.response
      })
    }
  }

  async onMessageCreate (message: Message) {
    const guildReplyCollection = this.replyCache.get(message.guildId)

    if (!guildReplyCollection) return

    const reply = guildReplyCollection.find(r => message.content.indexOf(r.trigger) !== -1)

    if (!reply) return

    message.reply(reply.response)
  }

  onMessageDelete (_message: Message | PartialMessage) {}

  async createReply (guildId: string, data: ReplyData) {
    let guildReplyCollection = this.replyCache.get(guildId)

    if (!guildReplyCollection) {
      this.replyCache.set(guildId, new Collection())
      guildReplyCollection = this.replyCache.get(guildId)
    }

    let autoReply = guildReplyCollection.find(r => r.trigger === data.trigger)

    if (autoReply) {
      return autoReply
    }

    autoReply = await prisma.autoReply.create({
      data: {
        trigger: data.trigger,
        response: data.response,
        guild: {
          connectOrCreate: {
            where: {
              id: guildId
            },
            create: {
              id: guildId
            }
          }
        }
      }
    })

    guildReplyCollection.set(data.trigger, autoReply)
    return autoReply
  }

  async deleteReply (guildId: string, id: string) {
    const guildReplyCollection = this.replyCache.get(guildId)

    await prisma.autoReply.delete({
      where: {
        id
      }
    })

    if (!guildReplyCollection) return

    guildReplyCollection.delete(id)
  }
}

import GarconeteClient from '@structures/Client.js'
import { Message } from 'discord.js'

import { prisma } from '../../../prisma.js'
import { inspect } from 'util'

const devUsers = process.env.DEV_USERS.split(' ')

const allusers = {
  run: async (_client: GarconeteClient, message: Message, _args: string[]) => {
    if (!devUsers.includes(message.author.id)) return

    // testing

    const allUsers = await prisma.user.findMany()

    message.reply(inspect(allUsers))
  }
}

export { allusers }

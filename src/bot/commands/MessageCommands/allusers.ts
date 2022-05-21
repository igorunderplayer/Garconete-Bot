import GarconeteClient from '@structures/Client'
import { Message } from 'discord.js'

import { prisma } from '../../../prisma'
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

import GarconeteClient from '@structures/Client.js'
import { Message } from 'discord.js'

const devUsers = process.env.DEV_USERS.split(' ')

const reload = {
  run: async (_client: GarconeteClient, message: Message, args: string[]) => {
    if (!devUsers.includes(message.author.id)) return

    // testing

    delete require.cache[require.resolve(`./${args[0]}`)]
    const cmd = await import(`./${args[0]}`)

    console.log(cmd)

    message.reply('testes')
  }
}

export { reload }

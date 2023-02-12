/* eslint-disable no-unused-vars */
import GarconeteClient from '@structures/Client.js'
import { Message, EmbedBuilder, Colors } from 'discord.js'
import { UsersService } from '@services/UsersService.js'
import { prisma } from 'prisma'
import { inspect } from 'util'

const devUsers = process.env.DEV_USERS.split(' ')

const evalCommand = {
  run: async (client: GarconeteClient, message: Message, args: string[]) => {
    if (!devUsers.includes(message.author.id)) return

    const usersService = new UsersService()

    const clean = (text: any): any => {
      if (typeof text === 'string') {
        text = text
          .replace(/`/g, `\`${String.fromCharCode(8203)}`)
          .replace(/@/g, `@${String.fromCharCode(8203)}`)
          .replace(new RegExp(process.env.TOKEN, 'gi'), '***')
      }

      return text
    }
    try {
      const result = clean(
        // eslint-disable-next-line no-eval
        inspect(await eval(args.join(' ')), { depth: 0 })
      )

      const embed = new EmbedBuilder()
        .setTitle('Resultado:')
        .setColor(Colors.DarkGreen)
        .setDescription(`\`\`\`js\n${result}\`\`\``)

      message.reply({ embeds: [embed] })
    } catch (e) {
      const embed = new EmbedBuilder()
        .setTitle('Erro')
        .setColor(Colors.DarkRed)
        .setDescription(`\`\`\`js\n${e}\`\`\``)
      message.reply({ embeds: [embed] })
    }
  }
}

export { evalCommand }

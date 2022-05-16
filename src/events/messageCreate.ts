import { ClientEvents, MessageEmbed } from 'discord.js'
import GarconeteClient from '../structures/Client'
import Event from '../structures/Event'

import { inspect } from 'util'
import { UserServices } from '../services'

const devUsers = process.env.DEV_USERS.split(' ')

export default class MessageCreate extends Event<'messageCreate'> {
  trigger: keyof ClientEvents = 'messageCreate';

  constructor (client: GarconeteClient) {
    super()
    this.client = client
  }

  async handle ([message]: ClientEvents['messageCreate']) {
    if (
      message.content.startsWith(`<@${this.client.user.id}>`) ||
      message.content.startsWith(`<@!${this.client.user.id}>`)
    ) {
      const [, cmd, ...args] = message.content.trim().split(' ')

      if (!cmd) message.reply('Use "/" para ver a lista de comandos (slashs meus e de outros bots)')
      if (cmd === 'die') message.reply(':flushed: no')
      if (cmd === 'sexo') message.reply('a noite toda bb rs :fire::smirk:')

      // test eval
      if (cmd === 'eval' && devUsers.includes(message.author.id)) {
        // eslint-disable-next-line no-unused-vars
        const userServices = new UserServices() // of using in eval rs

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

          const embed = new MessageEmbed()
            .setTitle('Resultado:')
            .setColor('DARK_GREEN')
            .setDescription(`\`\`\`js\n${result}\`\`\``)

          message.reply({ embeds: [embed] })
        } catch (e) {
          const embed = new MessageEmbed()
            .setTitle('Erro')
            .setColor('DARK_RED')
            .setDescription(`\`\`\`js\n${e}\`\`\``)
          message.reply({ embeds: [embed] })
        }
      }
    }
  }
}

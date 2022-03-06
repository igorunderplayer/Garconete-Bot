import { ClientEvents, Message, MessageEmbed } from "discord.js";
import GarconeteClient from "../structures/Client";
import Event from "../structures/Event";

import { inspect } from 'util'

const devUsers = process.env.DEV_USERS.split(' ')

export default class MessageCreate extends Event<'messageCreate'> {
  trigger: keyof ClientEvents = 'messageCreate';

  constructor(client: GarconeteClient) {
    super()
    this.client = client
  }

  async handle([message]: ClientEvents['messageCreate']) {
    if(
      message.content.startsWith(`<@${this.client.user.id}>`) ||
      message.content.startsWith(`<@!${this.client.user.id}>`)
    ) {
      const [, cmd, ...args] = message.content.trim().split(' ')
      
      if(cmd == 'eval' && devUsers.includes(message.author.id)) {
        try {
          let result = eval(args.join(' '))

          if(result instanceof Promise)
            result = await result

          // if(typeof result == 'object')
            result = inspect(result, { depth: 0 })

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

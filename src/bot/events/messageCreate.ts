import { ClientEvents } from 'discord.js'
import GarconeteClient from '@structures/Client'
import Event from '@structures/Event'

import * as commands from '../commands/MessageCommands'

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

      const command = commands[cmd]
      if (command) {
        command.run(this.client, message, args)
      }
    }
  }
}

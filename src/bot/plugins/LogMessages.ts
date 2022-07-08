import ClientPlugin from '@structures/ClientPlugin'
import GarconeteClient from '@structures/Client'
import { Message, PartialMessage } from 'discord.js'

export default class LogMessages extends ClientPlugin {
  constructor (client: GarconeteClient) {
    super({
      client,
      identifier: 'logMessages'
    })
  }

  onSetup () {}

  onMessageCreate (_message: Message) {
    console.log('a message was sent :)')
  }

  onMessageDelete (_message: Message | PartialMessage) {
    console.log('a message was deleted :(')
  }
}

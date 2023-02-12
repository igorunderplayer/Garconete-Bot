import GarconeteClient from '@structures/Client.js'
import { Message, PartialMessage } from 'discord.js'

export interface PluginOptions {
  identifier: string
  client: GarconeteClient
}

export default abstract class ClientPlugin {
  identifier: string
  client: GarconeteClient

  constructor (options: PluginOptions) {
    Object.assign(this, options)
  }

  abstract onSetup(): any

  abstract onMessageCreate(message: Message): any
  abstract onMessageDelete(message: Message | PartialMessage): any
}

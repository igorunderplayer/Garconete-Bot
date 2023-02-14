import Client from '@structures/Client.js'
import { Options } from 'discord.js'
import InteractionCreate from './events/interactionCreate.js'
import MessageCreate from './events/messageCreate.js'
import Ready from './events/ready.js'

import AutoReply from './plugins/AutoReply.js'

import * as Commands from './commands/index.js'

class BotStartup {
  client: Client
  async run () {
    this.client = new Client({
      discordOptions: {
        intents: 513,
        makeCache: Options.cacheWithLimits({
          MessageManager: 50
        })
      }
    })

    this.registerAllEvents()
    this.registerAllCommands()

    this.client.setupPlugins([
      new AutoReply(this.client)
    ])

    await this.client.login(process.env.TOKEN)

    return this.client
  }

  registerAllEvents () {
    this.client
      .registerEvent(new Ready(this.client))
      .registerEvent(new MessageCreate(this.client))
      .registerEvent(new InteractionCreate(this.client))
  }

  registerAllCommands () {
    this.client
      .registerCommand(Commands.Action)
      .registerCommand(Commands.Anime)
      .registerCommand(Commands.Avatar)
      .registerCommand(Commands.BotInfo)
      .registerCommand(Commands.Daily)
      .registerCommand(Commands.Money)
      .registerCommand(Commands.Ping)
  }
}

export default await new BotStartup().run()

import Client from '@structures/Client.js'
import { Options } from 'discord.js'
import { join } from 'path'

import AutoReply from './plugins/AutoReply.js'

class BotStartup {
  client: Client
  async run () {
    const basePath = './dist/bot' // temp

    const client = new Client({
      commandsPath: join(basePath, 'commands'),
      eventsPath: join(basePath, 'events'),
      discordClientOptions: {
        intents: 513,
        makeCache: Options.cacheWithLimits({
          MessageManager: 50
        })
      }
    })

    await client.loadEvents()
    client.setupPlugins([
      new AutoReply(client)
    ])

    await client.login(process.env.TOKEN)

    return this.client
  }
}

export default await new BotStartup().run()

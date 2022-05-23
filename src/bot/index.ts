import Client from '@structures/Client'
import { Options } from 'discord.js'
import { join } from 'path'

import AutoReply from './plugins/AutoReply'
import LogMessages from './plugins/LogMessages'

const client = new Client({
  commandsPath: join(__dirname, 'commands'),
  eventsPath: join(__dirname, 'events'),
  discordClientOptions: {
    intents: 513,
    makeCache: Options.cacheWithLimits({
      MessageManager: 50
    })
  }
})

client.loadEvents()
client.setupPlugins([
  new LogMessages(client),
  new AutoReply(client)
])

client.login(process.env.TOKEN)

export { client }

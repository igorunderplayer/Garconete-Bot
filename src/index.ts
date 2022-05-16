import Client from './structures/Client'
import { Options } from 'discord.js'

const client = new Client({
  intents: 513,
  makeCache: Options.cacheWithLimits({
    MessageManager: 50
  })
})

client.loadEvents()

client.login(process.env.TOKEN)

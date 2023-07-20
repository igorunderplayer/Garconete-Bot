import GarconeteClient from '@structures/Client.js'
import { Options } from 'discord.js'
import InteractionCreate from './events/interactionCreate.js'
import MessageCreate from './events/messageCreate.js'
import Ready from './events/ready.js'
import * as Commands from './commands/index.js'

const client = new GarconeteClient({
  discordOptions: {
    intents: 513,
    makeCache: Options.cacheWithLimits({
      MessageManager: 50
    })
  }
})

client
  .registerCommand(Commands.Action)
  .registerCommand(Commands.Anime)
  .registerCommand(Commands.Avatar)
  .registerCommand(Commands.BotInfo)
  .registerCommand(Commands.Daily)
  .registerCommand(Commands.Money)
  .registerCommand(Commands.Ping)

client
  .registerEvent(new Ready(client))
  .registerEvent(new MessageCreate(client))
  .registerEvent(new InteractionCreate(client))

client.login()

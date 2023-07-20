import { Collection, ShardingManager } from 'discord.js'

import * as Commands from './commands/index.js'

import type GarconeteClient from '@structures/Client.js'
import type GarconeteCommandBuilder from '@structures/GarconeteCommandBuilder.js'

class BotStartup {
  manager: ShardingManager
  commands: Collection<string, GarconeteCommandBuilder>
  async run () {
    this.manager = new ShardingManager('dist/bot/bot.js', {
      mode: 'worker',
      token: process.env.TOKEN
    })

    this.commands = new Collection()

    this.registerCommands()

    const shardAmount = !process.env.SHARD_AMOUNT ? 'auto' : parseInt(process.env.SHARD_AMOUNT)

    await this.manager.spawn({
      amount: shardAmount
    })

    this.manager.shards.first().eval((client: GarconeteClient) => {
      client.once('ready', () => { client.deployCommands() })
    }).then(() => console.log('Commands deploy called'))

    return this
  }

  registerCommands () {
    this
      .registerCommand(Commands.Action)
      .registerCommand(Commands.Anime)
      .registerCommand(Commands.Avatar)
      .registerCommand(Commands.BotInfo)
      .registerCommand(Commands.Daily)
      .registerCommand(Commands.Money)
      .registerCommand(Commands.Ping)
  }

  registerCommand (command: GarconeteCommandBuilder) {
    this.commands.set(command.name, command)

    return this
  }
}

export default await new BotStartup().run()

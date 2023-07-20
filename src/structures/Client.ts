import { Client, ClientEvents, ClientOptions, Collection } from 'discord.js'
import { request } from 'undici'

import GarconeteCommandBuilder from './GarconeteCommandBuilder.js'
import Event from './Event.js'

type CommandsCollection = Collection<string, GarconeteCommandBuilder>

export interface GarconeteOptions {
  discordOptions: ClientOptions
}

export default class GarconeteClient extends Client {
  _options: Partial<GarconeteOptions>
  blacklistedIds: Set<string>
  request: typeof request
  commands: CommandsCollection

  private DEV_GUILDS_ID = process.env.DEV_GUILDS.split(' ')

  constructor (options: GarconeteOptions) {
    super(options.discordOptions)

    this.blacklistedIds = new Set()
    this.commands = new Collection()
    this.request = request
  }

  registerEvent<EventName extends keyof ClientEvents> (event: Event<EventName>) {
    this.on(event.trigger, (...data: never) => event.handle(data))

    return this
  }

  registerCommand (command: GarconeteCommandBuilder) {
    this.commands.set(command.name, command)

    return this
  }

  registerCommands (commands: GarconeteCommandBuilder[]) {
    for (const command of commands) {
      this.registerCommand(command)
    }

    return this
  }

  async deployCommands () {
    const prodCommands = this.commands
      .filter(cmd => !cmd.devOnly)
      .map(cmd => cmd.toJSON())

    const devCommands = this.commands
      .filter(cmd => cmd.devOnly)
      .map(cmd => cmd.toJSON())

    console.log('Bot | Registering dev commands')
    for await (const devGuildId of this.DEV_GUILDS_ID) {
      const guild = this.guilds.cache.get(devGuildId)
      await guild.commands.set(devCommands)
    }

    console.log('Bot | Registering prod commands')
    await this.application.commands.set(prodCommands)

    return this
  }
}

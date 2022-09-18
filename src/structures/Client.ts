import { Client, ClientOptions, Collection } from 'discord.js'
import { request } from 'undici'
import { readdir } from 'fs/promises'
import { join } from 'path'

import ClientPlugin from './ClientPlugin'
import GarconeteCommandBuilder from './GarconeteCommandBuilder'

type CommandsCollection = Collection<string, GarconeteCommandBuilder>

export interface GarconeteOptions {
  commandsPath: string
  eventsPath: string
  discordClientOptions: ClientOptions
}

export default class GarconeteClient extends Client {
  _options: Partial<GarconeteOptions>
  blacklistedIds: string[]
  request: typeof request
  plugins: Collection<string, ClientPlugin>
  commands: CommandsCollection

  private DEV_GUILDS_ID = process.env.DEV_GUILDS.split(' ')

  constructor (options: GarconeteOptions) {
    super(options.discordClientOptions)

    this.blacklistedIds = []
    this.commands = new Collection()
    this.plugins = new Collection()
    this.request = request
    this._options = {
      commandsPath: options.commandsPath,
      eventsPath: options.eventsPath
    }
  }

  // Testing 2
  setupPlugins (plugins: ClientPlugin[]) {
    for (const plugin of plugins) {
      this.plugins.set(plugin.identifier, plugin)
      plugin.onSetup()
    }

    this.on('messageCreate', (message) => {
      this.plugins.forEach((plugin) => {
        plugin.onMessageCreate(message)
      })
    })

    this.on('messageDelete', (message) => {
      this.plugins.forEach((plugin) => {
        plugin.onMessageDelete(message)
      })
    })
  }

  async loadEvents () {
    const files = await readdir(this._options.eventsPath)
    for await (const file of files) {
      const { default: Event } = await import(join(this._options.eventsPath, file))
      const event = new Event(this)
      this.on(event.trigger, (...data) => event.handle(data))
    }
  }

  async loadCommands ({ ignoreCommandDirectory = [] } = {}) {
    const files = await readdir(this._options.commandsPath, { withFileTypes: true })
    await Promise.all(
      files.map(async file => {
        if (
          !file.isDirectory() ||
          ignoreCommandDirectory.includes(file.name)
        ) return

        const commandFiles = await readdir(join(this._options.commandsPath, file.name))

        for await (const commandFile of commandFiles) {
          const { command } = await import(join(this._options.commandsPath, file.name, commandFile))

          if (!command) continue

          this.commands.set(command.name, command)
        }
      })
    )

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

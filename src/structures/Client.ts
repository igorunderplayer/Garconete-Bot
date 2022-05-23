import { Client, ClientOptions, Collection } from 'discord.js'
import { request } from 'undici'
import { readdir } from 'fs/promises'

import Command from './Command'

import { join } from 'path'
import ClientPlugin from './ClientPlugin'

export interface GarconeteOptions {
  commandsPath: string
  eventsPath: string
  discordClientOptions: ClientOptions
}

export default class GarconeteClient extends Client {
  _options: Partial<GarconeteOptions>
  commands: Collection<string, Command>
  blacklistedIds: string[]
  request: typeof request
  plugins: Collection<string, ClientPlugin>

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
    // for await (file of files) n funciona direito aqui
    await Promise.all(files.map(async file => {
      if (!file.isDirectory() || ignoreCommandDirectory.includes(file.name)) return
      const commandFiles = await readdir(join(this._options.commandsPath, file.name))
      for await (const commandFile of commandFiles) {
        const { default: Command } = await import(join(this._options.commandsPath, file.name, commandFile))
        const command = new Command(this)

        if (command.handleSubCommands) {
          const subCommandFiles = (await readdir(join(this._options.commandsPath, file.name, commandFile))).filter(f => f !== 'index.ts' && f !== 'index.js')
          for await (const subCommandFile of subCommandFiles) {
            const { default: SubCommand } = await import(join(this._options.commandsPath, file.name, commandFile, subCommandFile))
            const subCommand = new SubCommand(this)
            command.options.push(subCommand)
          }
        }

        this.commands.set(command.name, command)
      }
    }))

    this.application?.commands.set([...this.commands.filter(c => !c.testing).values()])
    const devGuilds = process.env.DEV_GUILDS.split(' ')
    devGuilds.forEach(guildId => {
      const guild = this.guilds.cache.get(guildId)
      console.log(`[Bot] Registering testing commands to guild ${guild.name}`)
      guild.commands.set([...this.commands.filter(c => c.testing).values()])
    })
  }
}

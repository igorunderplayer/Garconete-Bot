import { Client, ClientOptions, Collection } from 'discord.js'
import { request } from 'undici'
import { readdir } from 'fs/promises'

import Command from './Command'

import { join } from 'path'

export default class GarconeteClient extends Client {
  commands: Collection<string, Command>
  blacklistedIds: string[]
  request: typeof request

  constructor (options: ClientOptions) {
    super(options)

    this.blacklistedIds = []
    this.commands = new Collection()
    this.request = request
  }

  async loadEvents (path = '/events') {
    const files = await readdir(join(__dirname, '..', path))
    for await (const file of files) {
      const { default: Event } = await import(join(__dirname, '..', path, file))
      const event = new Event(this)
      this.on(event.trigger, (...data) => event.handle(data))
    }
  }

  async loadCommands ({ path = '/commands', ignoreCommandDirectory = [] } = {}) {
    const files = await readdir(join(__dirname, '..', path), { withFileTypes: true })
    // for await (file of files) n funciona direito aqui
    await Promise.all(files.map(async file => {
      if (!file.isDirectory() || ignoreCommandDirectory.includes(file.name)) return
      const commandFiles = await readdir(join(__dirname, '..', path, file.name))
      for await (const commandFile of commandFiles) {
        const { default: Command } = await import(join(__dirname, '..', path, file.name, commandFile))
        const command = new Command(this)

        if (command.handleSubCommands) {
          const subCommandFiles = (await readdir(join(__dirname, '..', path, file.name, commandFile))).filter(f => f !== 'index.ts' && f !== 'index.js')
          for await (const subCommandFile of subCommandFiles) {
            const { default: SubCommand } = await import(join(__dirname, '..', path, file.name, commandFile, subCommandFile))
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

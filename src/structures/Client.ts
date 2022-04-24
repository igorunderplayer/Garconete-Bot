import { Client, ClientOptions } from 'discord.js'
import { request } from 'undici'
import { readdir } from 'fs/promises'

import Command from './Command'

import messages from '../messages.json'
import { join } from 'path'
import DatabaseManager from '../firebase/DatabaseManager'

import { app as firebaseApp } from '../firebase'

export default class GarconeteClient extends Client {
  database: DatabaseManager
  commands: Command[]
  request: typeof request

  constructor (options: ClientOptions) {
    super(options)

    this.database = new DatabaseManager(firebaseApp)
    this.commands = []
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

  async loadCommands (path = '/commands') {
    const files = await readdir(join(__dirname, '..', path), { withFileTypes: true })
    for await (const file of files) {
      if (!file.isDirectory()) return
      const commandFiles = await readdir(join(__dirname, '..', path, file.name))
      for await (const commandFile of commandFiles) {
        const { default: Command } = await import(join(__dirname, '..', path, file.name, commandFile))
        const command = new Command(this)

        if (command.handleSubCommands) {
          const subCommandFiles = (await readdir(join(__dirname, '..', path, file.name, commandFile))).filter(f => f !== 'index.ts' && f !== 'index.js')
          for await (const subCommandFile of subCommandFiles) {
            console.log(subCommandFile)
            const { default: SubCommand } = await import(join(__dirname, '..', path, file.name, commandFile, subCommandFile))
            const subCommand = new SubCommand(this)
            command.options.push(subCommand)
          }
        }
        this.commands.push(command)
      }
    }

    this.application?.commands.set(this.commands.filter(cmd => !cmd.testing))
    const devGuilds = process.env.DEV_GUILDS.split(' ')
    devGuilds.forEach(guildId => {
      const guild = this.guilds.cache.get(guildId)
      console.log(`[Bot] Registering testing commands to guild ${guild.name}`)
      guild.commands.set(this.commands.filter(cmd => cmd.testing))
    })
  }

  getCommandPhrase (command: string, prop: string, locale: string) {
    const phrase = messages.commands[command][prop]
    return phrase[locale] ?? phrase['en-US']
  }
}

import { Client, ClientOptions } from 'discord.js'
import { readdir } from 'fs/promises'

import Command from './Command'

import messages from '../messages.json'

export default class GarconeteClient extends Client {
  commands: Command[]

  constructor (options: ClientOptions) {
    super(options)

    this.commands = []
  }

  async loadEvents (path = 'src/events') {
    const files = await readdir(path)
    for await (const file of files) {
      const { default: Event } = await import(`../events/${file}`)
      const event = new Event(this)
      this.on(event.trigger, (...data) => event.handle(data))
    }
  }

  async loadCommands (path = 'src/commands') {
    const files = await readdir(path)
    for await (const file of files) {
      const commandFiles = await readdir(`${path}/${file}`)
      for await (const commandFile of commandFiles) {
        const { default: Command } = await import(process.cwd() + `/${path}/${file}/${commandFile}`)
        this.commands.push(new Command(this))
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

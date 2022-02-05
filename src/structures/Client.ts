import { Client, ClientOptions } from 'discord.js'
import { readdir } from 'fs/promises'

import Command from './Command'

export default class Garconete extends Client {
  commands: Command[]

  constructor (options: ClientOptions) {
    super(options)

    this.commands = []
  }

  async loadCommands () {
    const files = await readdir('src/commands')
    for await (const file of files) {
      const commandFiles = await readdir(`src/commands/${file}`)
      for await (const commandFile of commandFiles) {
        const { default: Command } = await import(`../commands/${file}/${commandFile}`)
        this.commands.push(new Command(this))
      }
    }

    this.application?.commands.set(this.commands.filter(cmd => !cmd.testing))
    this.guilds.cache.get('672933215836569610')?.commands.set(this.commands.filter(cmd => cmd.testing))
  }

  async loadEvents () {
    const files = await readdir('src/commands')
    for await (const file of files) {
      const eventName = file.split('.')[0]
      const { default: event } = await import(`../events/${file}`)

      this.on(eventName, (...args) => event.run)
    }
  }
}

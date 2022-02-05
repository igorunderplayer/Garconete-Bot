import { Client, ClientOptions } from 'discord.js'
import { readdir } from 'fs/promises'
import { Command } from '../@types'

export default class Garconete extends Client {
  commands: Command[]

  constructor(options: ClientOptions) {
    super(options)

    this.commands = []
  }

  async loadCommands() {
    const files = await readdir('src/commands')
    for await (const file of files) {
      const commandFiles = await readdir(`src/commands/${file}`)
      for await (const commandFile of commandFiles) {
        const { default: command } = await import(`../commands/${file}/${commandFile}`)
        this.commands.push(command)
      }
    }

    this.application?.commands.set(this.commands.filter(cmd => !cmd.testing))
    this.guilds.cache.get('672933215836569610')?.commands.set(this.commands.filter(cmd => cmd.testing))
  }
}
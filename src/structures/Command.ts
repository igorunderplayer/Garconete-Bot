import { CommandInteraction, ApplicationCommandData } from 'discord.js'
import GarconeteClient from './Client'

type CommandData = ApplicationCommandData & {
  description: string

  testing?: boolean
  nsfw?: boolean
}

export default abstract class Command {
  client: GarconeteClient;

  public name: CommandData['name']
  public description: CommandData['description']

  public testing: CommandData['testing']
  public nsfw: CommandData['nsfw']

  constructor (data: CommandData) {
    Object.assign(this, data)

    if (this.testing) {
      this.description = '[Testing] ' + this.description
    }
  }

  abstract run(interaction: CommandInteraction): Promise<any> | any
}

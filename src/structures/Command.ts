import { CommandInteraction, ApplicationCommandData, ApplicationCommandSubCommandData } from 'discord.js'
import GarconeteClient from './Client'

type SubCommand = ApplicationCommandSubCommandData & {

}

type CommandData = ApplicationCommandData & {
  description: string

  testing?: boolean
  nsfw?: boolean

  subCommands?: any
}

export type CommandRun = {
  interaction: CommandInteraction,
  t: (command: string, prop: string, locale: string, obj?: { [key: string]: any }) => string
}

export default abstract class Command {
  client: GarconeteClient;

  public name: CommandData['name']
  public description: CommandData['description']

  public handleSubCommands: CommandData['handleSubCommands']
  public subCommands: CommandData['subCommands']
  public testing: CommandData['testing']
  public nsfw: CommandData['nsfw']

  constructor (data: CommandData | SubCommand) {
    Object.assign(this, data)

    if (this.testing) {
      this.description = '[Testing] ' + this.description
    }
  }

  abstract run?({ interaction, t }: CommandRun): Promise<any> | any
}

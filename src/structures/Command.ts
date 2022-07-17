import GarconeteClient from './Client'
import type {
  CommandInteraction,
  ApplicationCommandData,
  ApplicationCommandSubCommandData,
  ApplicationCommandOption
} from 'discord.js'

type SubCommand = ApplicationCommandSubCommandData & {

}

type CommandData = ApplicationCommandData & {
  description: string

  testing?: boolean
  nsfw?: boolean

  options?: ApplicationCommandOption | any // a
  handleSubCommands?: boolean
  subCommands?: any
}

export type CommandRun = {
  interaction: CommandInteraction,
  t: (command: string,
    prop: string,
    locale: string,
    obj?: { [key: string]: any }) => string
}

export default abstract class Command {
  client: GarconeteClient;

  public name: CommandData['name']
  public description: CommandData['description']
  public options: CommandData['options']
  public handleSubCommands: CommandData['handleSubCommands']

  public subCommands: CommandData['subCommands']
  public testing: CommandData['testing']
  public nsfw: CommandData['nsfw']

  constructor (data: CommandData | SubCommand) {
    Object.assign(this,
      data)

    if (this.testing) {
      this.description = '[Testing] ' + this.description
    }
  }

  abstract run?({
    interaction,
    t
  }: CommandRun): Promise<any> | any
}

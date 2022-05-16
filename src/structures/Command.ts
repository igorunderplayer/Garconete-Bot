import { CommandInteraction, ApplicationCommandData, ApplicationCommandSubCommandData } from 'discord.js'
import translate from '../util/translate'
import GarconeteClient from './Client'

type SubCommand = ApplicationCommandSubCommandData & {

}

type CommandData = ApplicationCommandData & {
  description: string

  testing?: boolean
  nsfw?: boolean

  subCommands?: any
  handleSubCommands?: boolean
}

export type CommandRun = {
  interaction: CommandInteraction,
  t: typeof translate
}

export default abstract class Command {
  client: GarconeteClient;

  public name: CommandData['name']
  public description: CommandData['description']

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

import { CommandInteraction, ApplicationCommandData } from 'discord.js'
import Garconete from './Client'

type CommandData = ApplicationCommandData & {
  description: string

  testing?: boolean
  nsfw?: boolean
}

export default abstract class Command {
  client: Garconete | undefined;

  public name: CommandData['name']
  public description: CommandData['description']

  public testing: CommandData['testing']
  public nsfw: CommandData['nsfw']

  constructor (data: CommandData) {
    Object.assign(this, data)
  }

  abstract run(interaction: CommandInteraction): Promise<any> | any
}

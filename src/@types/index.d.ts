import { ApplicationCommandDataResolvable, CommandInteraction } from 'discord.js'

export type Command = ApplicationCommandDataResolvable & {
  testing: boolean
  run: (interaction: CommandInteraction) => Promise<any> | any
}
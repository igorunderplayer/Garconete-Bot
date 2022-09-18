import { CommandRun } from '@types'
import { SlashCommandSubcommandBuilder } from 'discord.js'

export default class GarconeteSubCommandBuilder extends SlashCommandSubcommandBuilder {
  onRun: CommandRun

  setRunMethod (runFunction: CommandRun) {
    this.onRun = runFunction
    return this
  }
}

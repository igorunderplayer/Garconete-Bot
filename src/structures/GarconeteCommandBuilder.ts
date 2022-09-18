import { CommandRun } from '@types'
import { SlashCommandBuilder } from 'discord.js'

export default class GarconeteCommandBuilder extends SlashCommandBuilder {
  devOnly = false
  onRun: CommandRun

  setDevOnly (devOnly: boolean) {
    this.devOnly = devOnly
    return this
  }

  setRunMethod (runFunction: CommandRun) {
    this.onRun = runFunction
    return this
  }
}

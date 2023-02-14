
import { CommandRun } from 'types/index.js'
import { SlashCommandBuilder, SlashCommandUserOption } from 'discord.js'
import GarconeteSubCommandBuilder from './GarconeteSubCommandBuilder.js'

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

  addSubcommand (subCommand: GarconeteSubCommandBuilder) {
    super.addSubcommand(subCommand)
    return this
  }

  addUserOption (input: SlashCommandUserOption | ((builder: SlashCommandUserOption) => SlashCommandUserOption)) {
    super.addUserOption(input)
    return this
  }
}

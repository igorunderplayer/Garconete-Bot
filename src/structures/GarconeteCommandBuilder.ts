import { SlashCommandBuilder } from 'discord.js'

export default class GarconeteCommandBuilder extends SlashCommandBuilder {
  devOnly = false

  setDevOnly (devOnly: boolean) {
    this.devOnly = devOnly
  }
}

import GarconeteClient from '@structures/Client'
import Command, { CommandRun } from '@structures/Command'
import { ApplicationCommandOptionType } from 'discord.js'

import OwOify from './owoify'
import Wallpaper from './wallpaper'

export default class Anime extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'anime',
      description: 'imagens de anime!!',
      handleSubCommands: true,
      options: [],
      testing: true
    })

    this.client = client
  }

  async run ({ interaction, t }: CommandRun) {
    const subCommand = interaction.options.data.find(opt => opt.type === ApplicationCommandOptionType.Subcommand)
    switch (subCommand.name) {
      case 'wallpaper': {
        await new Wallpaper(this.client).run({ interaction, t })
        break
      }
      case 'owoify': {
        await new OwOify(this.client).run({ interaction, t })
        break
      }
      default: {
        break
      }
    }
  }
}

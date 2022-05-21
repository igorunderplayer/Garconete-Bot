import GarconeteClient from '@structures/Client'
import Command, { CommandRun } from '@structures/Command'

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
    switch (interaction.options.getSubcommand()) {
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

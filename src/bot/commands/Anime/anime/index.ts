import { CommandRun } from '@structures/Command'
import GarconeteCommandBuilder from '@structures/GarconeteCommandBuilder'

import * as OwO from './owoify'
import * as Wallpaper from './wallpaper'

export const command = new GarconeteCommandBuilder()
  .setName('anime')
  .setDescription('some anime commands')
  .addSubcommand(Wallpaper.command)
  .addSubcommand(OwO.command)

export const run = async ({ client, interaction, t }: CommandRun) => {
  const subCommand = interaction.options.getSubcommand()

  switch (subCommand) {
    case 'wallpaper': {
      await Wallpaper.run({ client, interaction, t })
      break
    }

    case 'owoify': {
      await OwO.run({ client, interaction, t })
      break
    }

    default: {
      break
    }
  }
}

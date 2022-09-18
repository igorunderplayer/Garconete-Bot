import { CommandRun } from '@structures/Command'
import GarconeteCommandBuilder from '@structures/GarconeteCommandBuilder'

import * as OwO from './owoify'
import * as Wallpaper from './wallpaper'

export const command = new GarconeteCommandBuilder()
  .setName('anime')
  .setDescription('some anime commands')
  .setRunMethod(run)
  .addSubcommand(Wallpaper.command)
  .addSubcommand(OwO.command)

async function run ({ client, interaction, t }: CommandRun) {
  const subCommand = interaction.options.getSubcommand()

  switch (subCommand) {
    case 'wallpaper': {
      await Wallpaper.command.onRun({ client, interaction, t })
      break
    }

    case 'owoify': {
      await OwO.command.onRun({ client, interaction, t })
      break
    }

    default: {
      break
    }
  }
}

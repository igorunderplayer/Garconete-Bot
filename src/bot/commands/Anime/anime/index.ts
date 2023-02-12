import { CommandRun } from '@structures/Command.js'
import GarconeteCommandBuilder from '@structures/GarconeteCommandBuilder.js'

import * as OwO from './owoify.js'
import * as Wallpaper from './wallpaper.js'

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

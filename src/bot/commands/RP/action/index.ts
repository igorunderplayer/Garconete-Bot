import { CommandRun } from '@structures/Command.js'

import * as Hug from './hug.js'
import * as Kiss from './kiss.js'
import * as Marry from './marry.js'

import GarconeteCommandBuilder from '@structures/GarconeteCommandBuilder.js'

export const command = new GarconeteCommandBuilder()
  .setName('action')
  .setDescription('some actions to do')
  .setRunMethod(run)
  .addSubcommand(Hug.command)
  .addSubcommand(Kiss.command)
  .addSubcommand(Marry.command)

async function run ({ client, interaction, t }: CommandRun) {
  const subCommand = interaction.options.getSubcommand()

  switch (subCommand) {
    case 'hug': {
      await Hug.command.onRun({ client, interaction, t })
      break
    }

    case 'kiss': {
      await Kiss.command.onRun({ client, interaction, t })
      break
    }

    case 'marry': {
      await Marry.command.onRun({ client, interaction, t })
      break
    }

    default: {
      break
    }
  }
}

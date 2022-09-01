import { CommandRun } from '@structures/Command'

import * as Hug from './hug'
import * as Kiss from './kiss'
import * as Marry from './marry'

import GarconeteCommandBuilder from '@structures/GarconeteCommandBuilder'

export const command = new GarconeteCommandBuilder()
  .setName('action')
  .setDescription('some actions to do')
  .addSubcommand(Hug.command)
  .addSubcommand(Kiss.command)
  .addSubcommand(Marry.command)

export const run = async ({ client, interaction, t }: CommandRun) => {
  const subCommand = interaction.options.getSubcommand()

  switch (subCommand) {
    case 'hug': {
      await Hug.run({ client, interaction, t })
      break
    }

    case 'kiss': {
      await Kiss.run({ client, interaction, t })
      break
    }

    case 'marry': {
      await Marry.run({ client, interaction, t })
      break
    }

    default: {
      break
    }
  }
}

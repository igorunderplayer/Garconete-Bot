import Command, { CommandRun } from '@structures/Command'
import GarconeteClient from '@structures/Client'

import Hug from './hug'
import Kiss from './kiss'
import Marry from './marry'

export default class Actions extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'action',
      description: 'ações',
      handleSubCommands: true,
      testing: true,
      options: []
    })

    this.client = client
  }

  async run ({ interaction, t } : CommandRun) {
    const subCommand = interaction.options.getSubcommand()

    switch (subCommand) {
      case 'hug': {
        await new Hug(this.client).run({ interaction, t })
        break
      }
      case 'kiss': {
        await new Kiss(this.client).run({ interaction, t })
        break
      }
      case 'marry': {
        await new Marry(this.client).run({ interaction, t })
        break
      }
    }
  }
}

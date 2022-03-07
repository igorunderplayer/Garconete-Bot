import Command from '../../../structures/Command'
import GarconeteClient from '../../../structures/Client'
import { CommandInteraction } from 'discord.js'

export default class Actions extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'actions',
      description: 'ações',
      testing: true,
      handleSubCommands: true,
      options: []
    })

    this.client = client
  }

  async run (interaction: CommandInteraction) {
    const subCommand = interaction.options.getSubcommand()

    if (subCommand === 'hug') {
      const Commando = (await import('./hug')).default
      new Commando(this.client).run(interaction)
    }

    if(subCommand === 'kiss') {
      const Commando = (await import('./kiss')).default
      new Commando(this.client).run(interaction)
    }
  }
}

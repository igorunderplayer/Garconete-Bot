import Command from '../../structures/Command'
import GarconeteClient from '../../structures/Client'
import { CommandInteraction } from 'discord.js'

import { UserServices } from '../../services'

export default class Register extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'register',
      description: 'registra vc na db',
      testing: true
    })

    this.client = client
  }

  async run (interaction: CommandInteraction) {
    interaction.reply('registrando vc...')

    await new UserServices().createUser(interaction.user.id)

    interaction.editReply('vc foi registrado! (confia)')
  }
}

import Command, { CommandRun } from '@structures/Command'
import GarconeteClient from '@structures/Client'

import { UsersService } from '@services/UsersService'

export default class Register extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'register',
      description: 'registra vc na db',
      testing: true
    })

    this.client = client
  }

  async run ({ interaction, t } : CommandRun) {
    interaction.reply('registrando vc...   (cmd de testes)')

    await new UsersService().createUser(interaction.user.id)

    interaction.editReply('vc foi registrado! (confia)')
  }
}

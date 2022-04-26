import Command from '../../structures/Command'
import GarconeteClient from '../../structures/Client'
import { CommandInteraction } from 'discord.js'

import User from '../../models/User'

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
    interaction.reply('registrado vc...')
    const user = new User({
      ...interaction.user,
      money: 0
    })
    await this.client.database.createUser(user)
    interaction.editReply('vc foi registrado! (confia)')
  }
}

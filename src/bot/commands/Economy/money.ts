import GarconeteClient from '@structures/Client'
import Command, { CommandRun } from '@structures/Command'
import { UsersService } from '@services/UsersService'

export default class Money extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'money',
      description: 'shows your or other user\' money',
      options: [{
        type: 'USER',
        name: 'user',
        description: 'user who u want see money'
      }]
    })

    this.client = client
  }

  async run ({ interaction, t } : CommandRun) {
    const usersService = new UsersService()
    const user = interaction.options.getUser('user') ?? interaction.user
    const { money } = await usersService.getUser(user.id)

    interaction.reply(`${user.username}'s money: ${money}`)
  }
}

import { CommandRun } from '@structures/Command'
import { UsersService } from '@services/UsersService'

import GarconeteCommandBuilder from '@structures/GarconeteCommandBuilder'

export const command = new GarconeteCommandBuilder()
  .setName('money')
  .setDescription('shows your or other user\' money')
  .addUserOption(option =>
    option
      .setName('user')
      .setDescription('user who u want see money')
      .setRequired(false))

export const run = async ({ client, interaction, t }: CommandRun) => {
  const usersService = new UsersService()
  const user = interaction.options.getUser('user') ?? interaction.user
  const { money } = await usersService.getUser(user.id)

  interaction.reply(`${user.username}'s money: ${money}`)
}

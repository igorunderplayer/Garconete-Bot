import { CommandRun } from '@structures/Command.js'
import { UsersService } from '@services/UsersService.js'

import GarconeteCommandBuilder from '@structures/GarconeteCommandBuilder.js'

export const command = new GarconeteCommandBuilder()
  .setName('money')
  .setDescription('shows your or other user\' money')
  .setRunMethod(run)
  .addUserOption(option =>
    option
      .setName('user')
      .setDescription('user who u want see money')
      .setRequired(false)
  )

async function run ({ client, interaction, t }: CommandRun) {
  return interaction.reply('desativado')

  const usersService = new UsersService()
  const user = interaction.options.getUser('user') ?? interaction.user
  const { money } = await usersService.getUser(user.id)

  interaction.reply(`${user.username}'s money: ${money}`)
}

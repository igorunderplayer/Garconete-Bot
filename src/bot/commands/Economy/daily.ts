import { CommandRun } from '@structures/Command.js'
import { UsersService } from '@services/UsersService.js'
import convertMilliseconds from '@utils/convertMilliseconds.js'
import GarconeteCommandBuilder from '@structures/GarconeteCommandBuilder.js'

export const command = new GarconeteCommandBuilder()
  .setName('daily')
  .setDescription('get your daily reward')
  .setRunMethod(run)

async function run ({ client, interaction, t }: CommandRun) {
  return interaction.reply('desativado')

  await interaction.deferReply()

  const usersService = new UsersService()

  const DAY_IN_MS = 1000 * 60 * 60 * 24

  const user = await usersService.getUser(interaction.user.id)

  if ((Date.now() - user.dailyRewardAt.getTime()) < DAY_IN_MS) {
    const { hours, minutes, seconds } = convertMilliseconds(DAY_IN_MS - (Date.now() - user.dailyRewardAt.getTime()))
    return await interaction.editReply(t(command.name, 'already_claimed', interaction.locale, {
      remaining: `${hours}h ${minutes}m ${seconds}s`
    }))
  }

  const reward = 100

  const updatedUser = await usersService.updateUser(interaction.user.id, {
    dailyRewardAt: new Date(),
    money: user.money + reward
  })

  return await interaction.editReply(t(command.name, 'success', interaction.locale, {
    money: updatedUser.money,
    reward
  }))
}

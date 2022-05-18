import GarconeteClient from '@structures/Client'
import Command, { CommandRun } from '@structures/Command'
import { UserServices } from '@services/UserServices'
import convertMilliseconds from '../../util/convertMilliseconds'

export default class Daily extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'daily',
      description: 'Get your daily reward!'
    })

    this.client = client
  }

  async run ({ interaction, t } : CommandRun) {
    await interaction.deferReply()

    const userServices = new UserServices()

    const DAY_IN_MS = 1000 * 60 * 60 * 24

    const user = await userServices.getUser(interaction.user.id)

    if ((Date.now() - user.dailyRewardAt.getTime()) < DAY_IN_MS) {
      const { hours, minutes, seconds } = convertMilliseconds(DAY_IN_MS - (Date.now() - user.dailyRewardAt.getTime()))
      return await interaction.editReply(t(this.name, 'already_claimed', interaction.locale, {
        remaining: `${hours}h ${minutes}m ${seconds}s`
      }))
    }

    const reward = 100

    const updatedUser = await userServices.updateUser(interaction.user.id, {
      dailyRewardAt: new Date(),
      money: user.money + reward
    })

    return await interaction.editReply(t(this.name, 'success', interaction.locale, {
      money: updatedUser.money,
      reward
    }))
  }
}

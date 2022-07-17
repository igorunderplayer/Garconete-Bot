import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js'
import GarconeteClient from '@structures/Client'
import Command, { CommandRun } from '@structures/Command'

export default class Avatar extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'avatar',
      description: 'Manda o avatar de alguem',
      options: [{
        name: 'user',
        description: 'Usuario para roubar o avatar',
        type: ApplicationCommandOptionType.User,
        required: false
      }]
    })

    this.client = client
  }

  async run ({ interaction, t } : CommandRun) {
    const user = interaction.options.getUser('user') ?? interaction.user
    const avatar = user.displayAvatarURL({ size: 2048 })
    const title = t(this.name, 'embed.title', interaction.locale, {
      user: user.username
    })

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setURL(avatar)
      .setImage(avatar)
      .setColor('#C54C65')

    interaction.reply({ embeds: [embed] })
  }
}

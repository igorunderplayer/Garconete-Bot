import GarconeteClient from '@structures/Client'
import Command, { CommandRun } from '@structures/Command'

import { ApplicationCommandOptionType, Colors, EmbedBuilder } from 'discord.js'
import NekoClient from 'nekos.life'
const nekos = new NekoClient()

export default class Hug extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'hug',
      description: 'hugs a user',
      type: ApplicationCommandOptionType.Subcommand,
      options: [{
        name: 'user',
        description: 'user to get a hug',
        required: true,
        type: ApplicationCommandOptionType.User
      }]
    })

    this.client = client
  }

  async run ({ interaction, t } : CommandRun) {
    const user = interaction.options.getUser('user')

    const hug = await nekos.hug()

    const embed = new EmbedBuilder()
      .setColor(Colors.Yellow)
      .setImage(hug.url)
      .setDescription(t('action', 'hug.reply', interaction.locale, {
        author: interaction.user,
        user
      }))

    interaction.reply({
      embeds: [embed]
    })
  }
}

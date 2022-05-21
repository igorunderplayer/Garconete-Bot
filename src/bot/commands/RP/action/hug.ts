import GarconeteClient from '@structures/Client'
import Command, { CommandRun } from '@structures/Command'

import { MessageEmbed } from 'discord.js'
import NekoClient from 'nekos.life'
const nekos = new NekoClient()

export default class Hug extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'hug',
      description: 'hugs a user',
      type: 'SUB_COMMAND',
      options: [{
        name: 'user',
        description: 'user to get a hug',
        required: true,
        type: 'USER'
      }]
    })

    this.client = client
  }

  async run ({ interaction, t } : CommandRun) {
    const user = interaction.options.getUser('user')

    const hug = await nekos.hug()

    const embed = new MessageEmbed()
      .setColor('YELLOW')
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

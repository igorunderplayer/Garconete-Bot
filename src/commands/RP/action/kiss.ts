import Command, { CommandRun } from '@structures/Command'
import GarconeteClient from '@structures/Client'
import { MessageEmbed } from 'discord.js'

import gifs from '@assets/gifs/kiss.json'

export default class Kiss extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'kiss',
      description: 'kiss a user',
      type: 'SUB_COMMAND',
      options: [{
        name: 'user',
        required: true,
        description: 'user that will receive a nice kiss',
        type: 'USER'
      }]
    })

    this.client = client
  }

  async run ({ interaction, t } : CommandRun) {
    const user = interaction.options.getUser('user')
    // "easter egg"
    if (user.id === this.client.user.id) {
      await interaction.reply(':flushed:')
    }

    const gif = gifs[Math.floor(Math.random() * gifs.length)]

    const embed = new MessageEmbed()
      .setColor('PURPLE')
      .setImage(gif.url)
      .setDescription(t('action', 'kiss.reply', interaction.locale, {
        author: interaction.user,
        user
      }))

    if (interaction.replied) {
      return await interaction.editReply({
        embeds: [embed]
      })
    }

    interaction.reply({
      embeds: [embed]
    })
  }
}

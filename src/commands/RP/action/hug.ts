import GarconeteClient from '@structures/Client'
import Command, { CommandRun } from '@structures/Command'
import { MessageEmbed } from 'discord.js'

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

    const embed = new MessageEmbed()
      .setColor('YELLOW')
      .setImage('https://acegif.com/wp-content/uploads/anime-kissin-15.gif')
      .setDescription(t('action', 'hug.reply', interaction.locale, {
        author: interaction.user,
        user
      }))

    interaction.reply({
      embeds: [embed]
    })
  }
}

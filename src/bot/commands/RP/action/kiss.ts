import Command, { CommandRun } from '@structures/Command'
import GarconeteClient from '@structures/Client'
import { ApplicationCommandOptionType, Colors, EmbedBuilder } from 'discord.js'

import NekoClient from 'nekos.life'
const nekos = new NekoClient()

// import gifs from '@assets/gifs/kiss.json'

export default class Kiss extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'kiss',
      description: 'kiss a user',
      type: ApplicationCommandOptionType.Subcommand,
      options: [{
        name: 'user',
        required: true,
        description: 'user that will receive a nice kiss',
        type: ApplicationCommandOptionType.User
      }]
    })

    this.client = client
  }

  async run ({ interaction, t } : CommandRun) {
    let replied = false
    const user = interaction.options.getUser('user')

    // "easter egg"
    if (user.id === this.client.user.id) {
      await interaction.reply(':flushed:')
      replied = true
    }

    // const gif = gifs[Math.floor(Math.random() * gifs.length)]
    const kiss = await nekos.kiss()

    const embed = new EmbedBuilder()
      .setColor(Colors.Purple)
      .setImage(kiss.url)
      .setDescription(t('action', 'kiss.reply', interaction.locale, {
        author: interaction.user,
        user
      }))

    if (replied) {
      return interaction.editReply({
        embeds: [embed]
      })
    } else {
      return interaction.reply({
        embeds: [embed]
      })
    }
  }
}

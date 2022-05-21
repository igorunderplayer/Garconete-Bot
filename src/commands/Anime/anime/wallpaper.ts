import GarconeteClient from '@structures/Client'
import Command, { CommandRun } from '@structures/Command'
import { MessageEmbed } from 'discord.js'

import NekoClient from 'nekos.life'
const nekos = new NekoClient()

export default class Wallpaper extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'wallpaper',
      description: 'um wallpaper!!',
      type: 'SUB_COMMAND'
    })

    this.client = client
  }

  async run ({ interaction, t }: CommandRun) {
    if (interaction.channel.type !== 'GUILD_TEXT' || !interaction.channel.nsfw) {
      return await interaction.reply({
        content: '🔞 | Command disabled for non-nsfw channels',
        ephemeral: true
      })
    }

    const wallpaper = await nekos.wallpaper()

    const embed = new MessageEmbed()
      .setColor('DARK_VIVID_PINK')
      .setImage(wallpaper.url)
      .setDescription(t('anime', 'wallpaper.embed.description', interaction.locale, {
        imageUrl: wallpaper.url
      }))

    interaction.reply({
      embeds: [embed]
    })
  }
}

import GarconeteClient from '@structures/Client'
import Command, { CommandRun } from '@structures/Command'
import { ApplicationCommandOptionType, ChannelType, Colors, EmbedBuilder } from 'discord.js'

import NekoClient from 'nekos.life'
const nekos = new NekoClient()

export default class Wallpaper extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'wallpaper',
      description: 'um wallpaper!!',
      type: ApplicationCommandOptionType.Subcommand
    })

    this.client = client
  }

  async run ({ interaction, t }: CommandRun) {
    if (interaction.channel.type !== ChannelType.GuildText || !interaction.channel.nsfw) {
      return await interaction.reply({
        content: '🔞 | Command disabled for non-nsfw channels',
        ephemeral: true
      })
    }

    const wallpaper = await nekos.wallpaper()

    const embed = new EmbedBuilder()
      .setColor(Colors.DarkVividPink)
      .setImage(wallpaper.url)
      .setDescription(t('anime', 'wallpaper.embed.description', interaction.locale, {
        imageUrl: wallpaper.url
      }))

    interaction.reply({
      embeds: [embed]
    })
  }
}

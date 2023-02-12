import { CommandRun } from '@structures/Command.js'
import GarconeteSubCommandBuilder from '@structures/GarconeteSubCommandBuilder.js'
import { ChannelType, Colors, EmbedBuilder } from 'discord.js'

import NekoClient from 'nekos.life'
const nekos = new NekoClient()

export const command = new GarconeteSubCommandBuilder()
  .setName('wallpaper')
  .setDescription('anime wallpapers for you!!')
  .setRunMethod(run)

async function run ({ client, interaction, t }: CommandRun) {
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

import { EmbedBuilder } from 'discord.js'
import { CommandRun } from '@structures/Command'
import convertMilliseconds from '@utils/convertMilliseconds'
import GarconeteCommandBuilder from '@structures/GarconeteCommandBuilder'

export const command = new GarconeteCommandBuilder()
  .setName('botinfo')
  .setDescription('show some of my informations')
  .setDescriptionLocalizations({
    'pt-BR': 'mostra minhas informações'
  })

export const run = ({ client, interaction, t }: CommandRun) => {
  const title = t(command.name, 'embed.title', interaction.locale)
  const memoryText = t(command.name, 'embed.field[memory].name', interaction.locale)
  const statisticsText = t(command.name, 'embed.field[statistics].name', interaction.locale)
  const uptimeText = t(command.name, 'embed.field[uptime].name', interaction.locale)

  const heapTotal = ~~(process.memoryUsage().heapTotal / 1024 / 1024)
  const heapUsed = ~~(process.memoryUsage().heapTotal / 1024 / 1024)
  const rss = ~~(process.memoryUsage().rss / 1024 / 1024)

  const { days, hours, minutes } = convertMilliseconds(client.uptime)

  const embed = new EmbedBuilder()
    .setTitle(title)
    .addFields([
      { name: statisticsText, value: `Servers: ${client.guilds.cache.size}` },
      { name: uptimeText, value: `${days}d ${hours}h ${minutes}m` },
      { name: memoryText, value: `RSS: ${rss}mb | Heap: total: ${heapTotal}mb - used: ${heapUsed}mb` },
      { name: '🐛 Source', value: '[GitHub](https://github.com/igorunderplayer/Garconete-Bot)' }
    ])

  interaction.reply({ embeds: [embed] })
}

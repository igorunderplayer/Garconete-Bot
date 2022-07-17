import { EmbedBuilder } from 'discord.js'
import GarconeteClient from '@structures/Client'
import Command, { CommandRun } from '@structures/Command'
import convertMilliseconds from '@utils/convertMilliseconds'

export default class BotInfo extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'botinfo',
      description: 'mostra minhas informações'
    })

    this.client = client
  }

  async run ({ interaction, t } : CommandRun) {
    const title = t(this.name, 'embed.title', interaction.locale)
    const memoryText = t(this.name, 'embed.field[memory].name', interaction.locale)
    const statisticsText = t(this.name, 'embed.field[statistics].name', interaction.locale)
    const uptimeText = t(this.name, 'embed.field[uptime].name', interaction.locale)

    const heapTotal = ~~(process.memoryUsage().heapTotal / 1024 / 1024)
    const heapUsed = ~~(process.memoryUsage().heapTotal / 1024 / 1024)
    const rss = ~~(process.memoryUsage().rss / 1024 / 1024)

    const { days, hours, minutes } = convertMilliseconds(this.client.uptime)

    const embed = new EmbedBuilder()
      .setTitle(title)
      .addFields([
        { name: statisticsText, value: `Servers: ${this.client.guilds.cache.size}` },
        { name: uptimeText, value: `${days}d ${hours}h ${minutes}m` },
        { name: memoryText, value: `RSS: ${rss}mb | Heap: total: ${heapTotal}mb - used: ${heapUsed}mb` },
        { name: '🐛 Source', value: '[GitHub](https://github.com/igorunderplayer/Garconete-Bot)' }
      ])

    interaction.reply({ embeds: [embed] })
  }
}

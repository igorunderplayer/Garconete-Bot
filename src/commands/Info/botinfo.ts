import { MessageEmbed } from 'discord.js'
import GarconeteClient from '@structures/Client'
import Command, { CommandRun } from '@structures/Command'

export default class BotInfo extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'botinfo',
      description: 'mostra minhas informações',
      testing: true
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

    const DAY_IN_MILESSECONDS = 1000 * 60 * 60 * 24
    const HOUR_IN_MILESSECONDS = 1000 * 60 * 60
    const MINUTE_IN_MILESSECONDS = 1000 * 60

    const days = ~~(this.client.uptime / DAY_IN_MILESSECONDS)
    const hours = ~~(this.client.uptime % DAY_IN_MILESSECONDS / HOUR_IN_MILESSECONDS)
    const minutes = ~~(this.client.uptime % DAY_IN_MILESSECONDS % HOUR_IN_MILESSECONDS / MINUTE_IN_MILESSECONDS)

    const embed = new MessageEmbed()
      .setTitle(title)
      .addField(statisticsText, `Servers: ${this.client.guilds.cache.size}`)
      .addField(uptimeText, `${days}d ${hours}h ${minutes}m`)
      .addField(memoryText, `RSS: ${rss}mb | Heap: total: ${heapTotal}mb - used: ${heapUsed}mb`)
      .addField('🐛 Source', '[GitHub](https://github.com/igorunderplayer/Garconete-Bot)')

    interaction.reply({ embeds: [embed] })
  }
}

import { CommandInteraction, MessageEmbed } from 'discord.js'
import GarconeteClient from '../../structures/Client'
import Command from '../../structures/Command'

export default class BotInfo extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'botinfo',
      description: 'mostra minhas informações',
      testing: true
    })

    this.client = client
  }

  async run (interaction: CommandInteraction) {
    const title = this.client.getCommandPhrase(this.name, 'embed.title', interaction.locale)
    const memory = this.client.getCommandPhrase(this.name, 'embed.field[memory].name', interaction.locale)
    const statistics = this.client.getCommandPhrase(this.name, 'embed.field[statistics].name', interaction.locale)

    const heapTotal = ~~(process.memoryUsage().heapTotal / 1024 / 1024)
    const heapUsed = ~~(process.memoryUsage().heapTotal / 1024 / 1024)
    const rss = ~~(process.memoryUsage().rss / 1024 / 1024)

    const embed = new MessageEmbed()
      .setTitle(title)
      .addField(statistics, `Servers: ${this.client.guilds.cache.size}`)
      .addField(memory, `RSS: ${rss}mb | Heap-Total: ${heapTotal}mb Heap-Used: ${heapUsed}mb`)
      .addField('🐛 Source', '[GitHub](https://github.com/igorunderplayer/Garconete-Bot)')

    interaction.reply({ embeds: [embed] })
  }
}

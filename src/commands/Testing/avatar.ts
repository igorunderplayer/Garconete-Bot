import { CommandInteraction, MessageEmbed } from 'discord.js'
import GarconeteClient from '../../structures/Client'
import Command from '../../structures/Command'

import placeholders from '../../Util/placeholders'

export default class Avatar extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'avatar',
      description: 'Manda o avatar de alguem',
      options: [{
        name: 'user',
        description: 'Usuario para roubar o avatar',
        type: 'USER',
        required: false
      }]
    })

    this.client = client
  }

  async run (interaction: CommandInteraction) {
    const user = interaction.options.getUser('user') ?? interaction.user
    const avatar = user.displayAvatarURL({ size: 2048 })
    const phrase = this.client.getCommandPhrase(this.name, 'embed.title', interaction.locale)
    const title = placeholders({
      user: user.username
    }, phrase)

    console.log(interaction.locale)

    const embed = new MessageEmbed()
      .setTitle(title)
      .setURL(avatar)
      .setImage(avatar)
      .setColor('#C54C65')

    interaction.reply({ embeds: [embed] })
  }
}
import Command from '../../../structures/Command'
import GarconeteClient from '../../../structures/Client'
import { CommandInteraction, MessageActionRow, MessageButton } from 'discord.js'
import applyPlaceholders from '../../../util/placeholders'

export default class Kiss extends Command {
  constructor (client: GarconeteClient) {
    super({
      name: 'marry',
      description: 'marry with a user',
      type: 'SUB_COMMAND',
      options: [{
        name: 'user',
        required: true,
        description: 'your love',
        type: 'USER'
      }]
    })

    this.client = client
  }

  async run (interaction: CommandInteraction) {
    interaction.deferReply()
    const user = interaction.options.getUser('user')
    // "easter egg"
    if (user.id === this.client.user.id) {
      interaction.reply(':flushed: sorry, i am a bot')
      return
    }

    const dbUser = await this.client.database.getUser(interaction.user.id)

    if (dbUser.marriedWith) {
      const marriedWith = await this.client.users.fetch(dbUser.marriedWith)
      interaction.editReply(`vc... ja é casado... com ${marriedWith}.. (em teoria vc poderia casar-se com mais de uma pessoa, porem eu n permito)`)
    } else {
      const row = new MessageActionRow()
        .addComponents([
          new MessageButton()
            .setStyle('SUCCESS')
            .setLabel('SIM, teremos muito sexo')
            .setCustomId('yeah')
        ])

      await interaction.editReply({
        content: `${user}, ${interaction.user} deseja casar-se com vc, aceitas??`,
        components: [row]
      })

      const reply = await interaction.fetchReply()

      const collector = interaction.channel.createMessageComponentCollector({
        filter: int => int.user.id === user.id && int.message.id === reply.id,
        componentType: 'BUTTON',
        time: 30000,
        max: 1
      })

      collector.on('collect', int => {
        if (int.customId === 'yeah') {
          this.client.database.updateUser({
            id: interaction.user.id,
            marriedWith: user.id
          })
          int.reply(`${user} e ${interaction.user}, parabens, vcs estao cazados!!`)
        }
      })
    }
  }
}

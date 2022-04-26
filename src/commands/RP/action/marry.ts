import Command from '../../../structures/Command'
import GarconeteClient from '../../../structures/Client'
import { CommandInteraction, Message, MessageActionRow, MessageButton } from 'discord.js'
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
    await interaction.deferReply()
    const user = interaction.options.getUser('user')
    // "easter egg"
    if (user.id === this.client.user.id) {
      interaction.editReply(':flushed: sorry, i am a bot')
      return
    }

    if (user.id === interaction.user.id) {
      interaction.editReply('amor proprio é tudo')
      return
    }

    const dbUser = await this.client.database.getUser(interaction.user.id)

    if (dbUser.money < 250) {
      await interaction.editReply('Você é muito pobre para isso, um casamento necessita de no minimo 250 coins!')
      return
    }

    if (dbUser.marriedWith) {
      const marriedWith = await this.client.users.fetch(dbUser.marriedWith)
      interaction.editReply(`vc... ja é casado... com ${marriedWith}.. (em teoria vc poderia casar-se com mais de uma pessoa, porem eu n permito)`)
    } else {
      const row = new MessageActionRow()
        .addComponents([
          new MessageButton()
            .setStyle('SUCCESS')
            .setLabel('SIM, teremos muito sexo')
            .setCustomId('yeah'),
          new MessageButton()
            .setStyle('DANGER')
            .setLabel('NAO, nada de sexo')
            .setCustomId('no')
        ])

      await interaction.editReply({
        content: `${user}, ${interaction.user} deseja casar-se com vc, aceitas??`,
        components: [row]
      })

      const reply = await interaction.fetchReply() as Message<true>

      const collector = interaction.channel.createMessageComponentCollector({
        filter: int => int.user.id === user.id && int.message.id === reply.id,
        componentType: 'BUTTON',
        time: 30000,
        max: 1
      })

      collector.on('collect', async int => {
        if (int.customId === 'yeah') {
          await this.client.database.updateUser({
            id: interaction.user.id,
            marriedWith: user.id
          })

          await this.client.database.updateUser({
            id: int.user.id,
            marriedWith: interaction.user.id
          })

          int.reply(`${user} e ${interaction.user}, parabens, vcs estao cazados!!`)
        } else {
          int.reply(`${interaction.user} ... infelizmente ${user} não sente o mesmo que vc sente por ele(a).... mas vc sempre pode tentar dnv com outra pessoa :smile:`)
        }
      })

      collector.on('end', (_collected, reason) => {
        if (reason === 'time') {
          reply.edit({
            content: `${interaction.user} vc foi COMPLETAMENTE ignorado por ${user.username}`,
            components: []
          })
        }
      })
    }
  }
}

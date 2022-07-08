import Command, { CommandRun } from '@structures/Command'
import GarconeteClient from '@structures/Client'
import { Message, MessageActionRow, MessageButton } from 'discord.js'
import { UsersService } from '@services/UsersService'

export default class Marry extends Command {
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

  async run ({ interaction, t } : CommandRun) {
    await interaction.deferReply()
    const user = interaction.options.getUser('user')
    const usersService = new UsersService()

    // "easter egg"
    if (user.id === this.client.user.id) {
      interaction.editReply(':flushed: sorry, i am a bot')
      return
    }

    if (user.id === interaction.user.id) {
      interaction.editReply('amor proprio é tudo')
      return
    }

    const dbUser = await usersService.getUser(interaction.user.id)
    const askedUser = await usersService.getUser(user.id)

    if (dbUser.money < 250) {
      await interaction.editReply(t('action', 'marry.toopoor', interaction.locale))
      return
    }

    if (dbUser.marriedWithId) {
      const marriedWith = await this.client.users.fetch(dbUser.marriedWithId)
      await interaction.editReply(t('action', 'marry.alread', interaction.locale, { marriedWith }))
      return
    }

    if (askedUser.marriedWithId) {
      await interaction.editReply(t('action', 'marry.otherAlreadMaried', interaction.locale))
    }

    const row = new MessageActionRow()
      .addComponents([
        new MessageButton()
          .setStyle('SUCCESS')
          .setEmoji('✅')
          .setCustomId('yeah'),
        new MessageButton()
          .setStyle('DANGER')
          .setEmoji('❌')
          .setCustomId('no')
      ])

    await interaction.editReply({
      content: t('action', 'marry.ask', interaction.locale, { asksTo: user, user: interaction.user }),
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
        await usersService.updateUser(interaction.user.id, {
          marriedWithId: user.id
        })

        int.reply(t('action', 'marry.happyEnding', interaction.locale, { asksTo: user, user: interaction.user }))
      } else {
        int.reply(t('action', 'marry.sadEnding', interaction.locale, { asksTo: user, user: interaction.user }))
      }
    })

    collector.on('end', (_collected, reason) => {
      if (reason === 'time') {
        reply.edit({
          content: t('action', 'marry.ignored', interaction.locale, { asksTo: user.username, user: interaction.user }),
          components: []
        })
      }
    })
  }
}

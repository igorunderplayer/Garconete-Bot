import { ClientEvents, MessageEmbed, TextChannel } from 'discord.js'
import GarconeteClient from '@structures/Client'
import Event from '@structures/Event'

import translate from '@utils/translate'

export default class InteractionCreate extends Event<'interactionCreate'> {
  trigger: keyof ClientEvents = 'interactionCreate'

  constructor (client: GarconeteClient) {
    super()
    this.client = client
  }

  async handle ([interaction]: ClientEvents['interactionCreate']) {
    if (interaction.isCommand()) {
      if (this.client.blacklistedIds.indexOf(interaction.user.id) !== -1) {
        return interaction.reply({
          content: 'you are blacklisted',
          ephemeral: true
        })
      }

      try {
        const command = this.client.commands.get(interaction.commandName)
        await command.run({ interaction, t: (command, prop, locale, obj) => translate('commands', command, prop, locale, obj) })
      } catch (err) {
        const errorLogsChannel = await this.client.channels.fetch(process.env.DISCORD_ERROR_LOGS_CHANNEL) as TextChannel

        const errorEmbed = new MessageEmbed()
          .setColor('RED')
          .addField('Error', `\`\`\`js\n${err}\n\`\`\``)

        errorLogsChannel.send({
          embeds: [errorEmbed]
        })

        console.error('[Error]', err)
        interaction.reply({
          content: translate('events', 'interactionCreate', 'command.error', interaction.locale), ephemeral: true
        }).catch(() => interaction.editReply({
          content: translate('events', 'interactionCreate', 'command.error', interaction.locale)
        }))
      }
    }
  }
}

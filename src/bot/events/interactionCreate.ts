import { ClientEvents, EmbedBuilder, TextChannel, Colors, InteractionType } from 'discord.js'
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
    if (interaction.type === InteractionType.ApplicationCommand) {
      if (this.client.blacklistedIds.has(interaction.user.id)) {
        return interaction.reply({
          content: 'you are blacklisted',
          ephemeral: true
        })
      }

      if (interaction.isChatInputCommand()) {
        try {
          const command = this.client.commands.get(interaction.commandName)
          await command.onRun({ client: this.client, interaction, t: (command, prop, locale, obj) => translate(`commands.${command}.${prop}`, locale, obj) })
        } catch (err) {
          const errorLogsChannel = await this.client.channels.fetch(process.env.DISCORD_ERROR_LOGS_CHANNEL) as TextChannel

          const errorEmbed = new EmbedBuilder()
            .setColor(Colors.Red)
            .addFields([{
              name: 'Error',
              value: `\`\`\`js\n${err}\n\`\`\``
            }])

          errorLogsChannel.send({
            embeds: [errorEmbed]
          })

          console.error('[Error]', err)
          interaction.reply({
            content: translate('events.interactionCreate.command.error', interaction.locale), ephemeral: true
          }).catch(() => interaction.editReply({
            content: translate('events.interactionCreate.command.error', interaction.locale)
          }))
        }
      }
    }
  }
}

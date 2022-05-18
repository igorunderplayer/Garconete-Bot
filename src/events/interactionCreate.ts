import { ClientEvents } from 'discord.js'
import GarconeteClient from '../structures/Client'
import Event from '../structures/Event'

import translate from '../util/translate'

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

      console.log(interaction.commandName)
      const command = this.client.commands.get(interaction.commandName)
      await command.run({ interaction, t: translate })
    }
  }
}

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
      const command = this.client.commands.find(cmd => cmd.name === interaction.commandName)
      await command.run({ interaction, t: translate })
    }
  }
}

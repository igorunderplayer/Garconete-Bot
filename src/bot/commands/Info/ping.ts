import { CommandRun } from '@structures/Command'
import GarconeteCommandBuilder from '@structures/GarconeteCommandBuilder'

export const command = new GarconeteCommandBuilder()
  .setName('ping')
  .setDescription('manda minha latencia')

export const run = ({ client, interaction, t }: CommandRun) => {
  const reply = t(command.name, 'reply', interaction.locale, {
    wsLatency: ~~(client.ws.ping)
  })
  interaction.reply(reply)
}

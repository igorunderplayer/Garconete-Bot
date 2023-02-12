import { CommandRun } from '@structures/Command.js'
import GarconeteCommandBuilder from '@structures/GarconeteCommandBuilder.js'

export const command = new GarconeteCommandBuilder()
  .setName('ping')
  .setDescription('manda minha latencia')
  .setRunMethod(run)
  .addUserOption(option =>
    option
      .setName('user')
      .setDescription('usuario q deseja roubar o avatar')
      .setRequired(true)
  )

async function run ({ client, interaction, t }: CommandRun) {
  const reply = t(command.name, 'reply', interaction.locale, {
    wsLatency: ~~(client.ws.ping)
  })
  interaction.reply(reply)
}

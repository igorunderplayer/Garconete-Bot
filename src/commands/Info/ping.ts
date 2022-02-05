import { Command } from '../../@types'

const command: Command = {
  name: 'ping',
  description: 'Responde com minha latencia',

  testing: true,
  run: async (interaction) => {
    interaction.reply('mina latencia')
  }
}

export default command;
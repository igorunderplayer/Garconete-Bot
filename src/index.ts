import 'dotenv/config'

import Client from './structures/Client'
const client = new Client({
  intents: 1
})

client.on('ready', () => {
  client.loadCommands()
})

client.on('interactionCreate', async (interaction) => {
  console.log('[Event] interactionCreate')
  if (interaction.isCommand()) {
    const command = client.commands.find(cmd => cmd.name === interaction.command?.name)
    await command?.run(interaction)
  }
})

client.login(process.env.TOKEN)

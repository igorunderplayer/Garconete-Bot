import 'dotenv/config'

import Client from './structures/Client'
const client = new Client({
  intents: 1
})

client.loadEvents('src/events')

client.login(process.env.TOKEN)

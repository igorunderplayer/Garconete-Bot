import 'dotenv/config'

import Client from './structures/Client'
const client = new Client({
  intents: 513
})

client.loadEvents('src/events')

client.login(process.env.TOKEN)

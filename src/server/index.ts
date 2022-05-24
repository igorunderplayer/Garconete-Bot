// Testing!

import express from 'express'
import cors from 'cors'

import * as routes from './routes'

import { client } from '../bot'

const app = express()

const port = process.env.PORT ?? 8080

app.use(cors())
app.use(express.json())

app.use('/auth', routes.auth)
app.use('/guilds', routes.guild)

app.get('/commands', (req, res) => {
  const commands = client.commands.filter(cmd => !cmd.testing).map(command => {
    return {
      name: command.name,
      description: command.description,
      options: command.options ?? []
    }
  })

  res.json({ data: commands })
})

app.use((req, res, next) => {
  res.status(404).send('Route not found!')
})

app.listen(port, () => {
  console.log(`[Server] Listening on port ${port}`)
})

export { app }

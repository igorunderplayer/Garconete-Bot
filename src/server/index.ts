// Testing!

import express from 'express'
import cors from 'cors'

import * as routes from './routes/index.js'

import bot from '@bot/index.js'

export default class ServerStartup {
  app: express.Application

  async run () {
    this.app = express()

    const port = process.env.PORT ?? 8080

    this.app.use(cors())
    this.app.use(express.json())

    this.app.use('/auth', routes.auth)
    this.app.use('/guilds', routes.guild)
    this.app.use('/users', routes.users)

    this.app.get('/commands', (req, res) => {
      const commands = bot.commands.filter(cmd => !cmd.devOnly).map(command => {
        return {
          name: command.name,
          description: command.description,
          options: command.options ?? []
        }
      })

      res.json({ data: commands })
    })

    this.app.use((req, res, next) => {
      res.status(404).send('Route not found!')
    })

    this.app.listen(port, () => {
      console.log(`[Server] Listening on port ${port}`)
    })

    return this.app
  }
}

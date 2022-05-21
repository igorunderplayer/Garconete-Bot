// Testing!

import { PrismaClient } from '@prisma/client'
import express from 'express'

import * as routes from './routes'

const app = express()

const port = process.env.PORT ?? 8080

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})

app.use(express.json())

app.use('/auth', routes.auth)

app.get('/hello', (req, res) => {
  res.send('Hello!')
})

app.get('/user/:id', async (req, res) => {
  const { id } = req.params

  const user = await prisma.user.findUnique({
    where: {
      id
    }
  })

  if (!user) {
    return res.status(404).json({
      message: 'User not found'
    })
  }

  res.json({ user })
})

app.use((req, res, next) => {
  res.status(404).send('Route not found!')
})

app.listen(port, () => {
  console.log(`[Server] Listening on port ${port}`)
})

export { app }

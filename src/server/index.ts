// Testing!

import express from 'express'

import * as routes from './routes'

const app = express()

const port = process.env.PORT ?? 8080

app.use(express.json())

app.use('/auth', routes.auth)

app.get('/hello', (req, res) => {
  res.send('Hello!')
})

app.use((req, res, next) => {
  res.status(404).send('Route not found!')
})

app.listen(port, () => {
  console.log(`[Server] Listening on port ${port}`)
})

export { app }

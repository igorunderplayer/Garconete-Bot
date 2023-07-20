import { DiscordRestUsersService } from '@services/DiscordRestUsersService.js'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../../prisma.js'
import { fetch } from 'undici'
const router = Router()

const SECRET = process.env.JWT_SECRET

router.get('/teste', (req, res) => {
  res.json({ message: 'teste lol' })
})

router.post('/login', async (req, res) => {
  const { code } = req.body
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ message: 'Invalid oauth code' })
  }

  const users = new DiscordRestUsersService()
  const { CLIENT_ID, CLIENT_SECRET } = process.env

  const encodedParams = new URLSearchParams()

  encodedParams.set('client_id', CLIENT_ID)
  encodedParams.set('client_secret', CLIENT_SECRET)
  encodedParams.set('grant_type', 'authorization_code')
  encodedParams.set('code', code)
  encodedParams.set('redirect_uri', req.headers.origin)
  encodedParams.set('scopes', 'identify')

  const url = 'https://discord.com/api/oauth2/token'

  const options = {
    method: 'POST',
    body: encodedParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  const response = await fetch(url, options)

  if (response.status !== 200) {
    console.log(await response.text())
    res.status(500).send('deu error!!!!')
    return
  }

  // eslint-disable-next-line camelcase
  const data = await response.json() as { token_type: string, access_token: string }

  const userData = await users.getUserData(data.access_token)

  const token = jwt.sign(
    {
      id: userData.id
    }, SECRET,
    {
      expiresIn: 60 * 60 * 24 // 1 day
    }
  )

  await prisma.user.update({
    where: {
      id: userData.id
    },
    data: {
      accessToken: data.access_token
    }
  })

  res.json({ message: 'Logged lol', data: userData, token })
})

export default router

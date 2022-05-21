import { Router } from 'express'
import { fetch } from 'undici'
const router = Router()

router.get('/teste', (req, res) => {
  res.json({ message: 'teste lol' })
})

router.post('/login', async (req, res) => {
  const { code } = req.body
  if (!code || typeof code !== 'string') {
    res.status(400).json({ message: 'Invalid oauth code' })
  }

  const { CLIENT_ID, CLIENT_SECRET } = process.env

  const encodedParams = new URLSearchParams()

  encodedParams.set('client_id', CLIENT_ID)
  encodedParams.set('client_secret', CLIENT_SECRET)
  encodedParams.set('grant_type', 'authorization_code')
  encodedParams.set('code', code)
  encodedParams.set('redirect_uri', 'http://localhost:3000')
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
    res.status(500).send('deu error!!!!')
    return
  }

  // eslint-disable-next-line camelcase
  const data = await response.json() as { token_type: string, access_token: string }

  const userInfo = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `${data.token_type} ${data.access_token}`
    }
  }).then(r => r.json())

  res.json({ message: 'Logged lol', data: userInfo })
})

export default router

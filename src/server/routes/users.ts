import { Router } from 'express'
import jwt from 'jsonwebtoken'

import { UsersService } from '@services/UsersService.js'
import { DiscordRestUsersService } from '@services/DiscordRestUsersService.js'
import { APIUser } from 'discord.js'

const router = Router()
const SECRET = process.env.JWT_SECRET

router.get('/@me', async (req, res) => {
  const usersService = new UsersService()
  const discordUsers = new DiscordRestUsersService()
  const { authorization } = req.headers

  if (!authorization || authorization.trim() === '') {
    res.status(401).send({ message: 'Invalid authorization token' })
    return
  }

  let decoded: jwt.JwtPayload

  try {
    const payload = jwt.verify(authorization, SECRET)
    decoded = payload as jwt.JwtPayload
  } catch (_err) {
    res.status(401).send({ message: 'Invalid authorization token' })
    return
  }

  const user = await usersService.getUser(decoded.id)
  // eslint-disable-next-line camelcase
  const discordUser = await discordUsers.getUserData(user.accessToken) as APIUser & { banner_color: string }

  res.json({
    user: {
      id: user.id,
      avatar: discordUser.avatar,
      username: discordUser.username,
      discriminator: discordUser.discriminator,
      accentColor: discordUser.accent_color,
      bannerColor: discordUser.banner_color,
      flags: discordUser.flags,
      money: user.money,
      createdAt: user.createdAt,
      dailyRewardAt: user.dailyRewardAt,
      marriedWithUserId: user.marriedWithId
    }
  })
})

router.get('/@me/guilds', async (req, res) => {
  const usersService = new UsersService()
  const discordUsers = new DiscordRestUsersService()
  const { authorization } = req.headers

  if (!authorization || authorization.trim() === '') {
    res.status(401).send({ message: 'Invalid authorization token' })
    return
  }

  let decoded: jwt.JwtPayload

  try {
    const payload = jwt.verify(authorization, SECRET)
    decoded = payload as jwt.JwtPayload
  } catch (_err) {
    res.status(401).send({ message: 'Invalid authorization token' })
  }

  const { accessToken } = await usersService.getUser(decoded.id)
  const userGuilds = await discordUsers.getUserGuilds(accessToken)

  res.json({
    guilds: userGuilds
  })
})

export default router

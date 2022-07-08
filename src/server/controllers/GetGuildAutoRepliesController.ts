import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { DiscordRestUsersService } from '@services/DiscordRestUsersService'
import { UsersService } from '@services/UsersService'

import { Permissions } from 'discord.js'
import { prisma } from '../../prisma'

const SECRET = process.env.JWT_SECRET

class GetGuildAutoRepliesController {
  async handle (req: Request, res: Response) {
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

    const { guildId } = req.params

    const user = await usersService.getUser(decoded.id)
    const guild = await discordUsers.getUserGuild(user.accessToken, guildId)
    const permissions = BigInt(guild.permissions)

    const hasPermission = (permissions & Permissions.FLAGS.MANAGE_GUILD) === (Permissions.FLAGS.MANAGE_GUILD)

    if (!hasPermission) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const autoReply = await prisma.autoReply.findMany({
      where: {
        guildId
      }
    })

    res.status(200).json({ data: autoReply })
  }
}

export { GetGuildAutoRepliesController }

import { Request, Response } from 'express'

import jwt from 'jsonwebtoken'

import AutoReply from '@bot/plugins/AutoReply.js'
import bot from '@bot/index.js'
import { DiscordRestUsersService } from '@services/DiscordRestUsersService.js'
import { UsersService } from '@services/UsersService.js'

import { PermissionsBitField } from 'discord.js'

const SECRET = process.env.JWT_SECRET

class CreateGuildAutoReplyController {
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

    const plugin = bot.plugins.get('autoReply') as AutoReply

    const { reply } = req.body
    const { guildId } = req.params

    const user = await usersService.getUser(decoded.id)
    const guild = await discordUsers.getUserGuild(user.accessToken, guildId)
    const permissions = BigInt(guild.permissions)

    const hasPermission = (permissions & PermissionsBitField.Flags.ManageGuild) === (PermissionsBitField.Flags.ManageGuild)

    if (!hasPermission) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const autoReply = await plugin.createReply(guildId, {
      trigger: reply.trigger,
      response: reply.response
    })

    res.status(201).json({ data: autoReply })
  }
}

export { CreateGuildAutoReplyController }

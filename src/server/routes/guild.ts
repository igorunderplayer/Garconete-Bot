import { Router } from 'express'
import { prisma } from '../../prisma'

const router = Router()

router.post('/:guildId/autoreply', async (req, res) => {
  const { reply } = req.body
  const { guildId } = req.params

  const autoReply = await prisma.autoReply.create({
    data: {
      trigger: reply.trigger,
      response: reply.response,
      guild: {
        connectOrCreate: {
          where: {
            id: guildId
          },
          create: {
            id: guildId
          }
        }
      }
    }
  })

  res.status(201).json({ data: autoReply })
})

router.delete('/:guildId/autoreply', async (req, res) => {
  // TEMP
  if (!req.headers.authorization) {
    res.status(401).json({ message: 'Unauthorized' })
  }

  const { replyId } = req.query

  if (!replyId || typeof replyId !== 'string') {
    res.status(400).json({ message: 'Invalid autoreply id' })
  }

  await prisma.autoReply.delete({
    where: {
      id: replyId
    }
  })

  res.status(200).json({ message: 'Deleted' })
})

export default router

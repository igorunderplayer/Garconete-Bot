import { Router } from 'express'

import { GetGuildAutoRepliesController } from 'server/controllers/GetGuildAutoRepliesController'
import { CreateGuildAutoReplyController } from 'server/controllers/CreateGuildAutoReplyController'
import { DeleteGuildAutoReplyController } from 'server/controllers/DeleteGuildAutoReplyController'

const router = Router()
const SECRET = process.env.JWT_SECRET

router.get('/:guildId/autoreply', new GetGuildAutoRepliesController().handle)
router.post('/:guildId/autoreply', new CreateGuildAutoReplyController().handle)
router.delete('/:guildId/autoreply/:id', new DeleteGuildAutoReplyController().handle)

export default router

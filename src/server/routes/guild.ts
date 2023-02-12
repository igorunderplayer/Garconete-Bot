import { Router } from 'express'

import { GetGuildAutoRepliesController } from '@server/controllers/GetGuildAutoRepliesController.js'
import { CreateGuildAutoReplyController } from '@server/controllers/CreateGuildAutoReplyController.js'
import { DeleteGuildAutoReplyController } from '@server/controllers/DeleteGuildAutoReplyController.js'

const router = Router()

router.get('/:guildId/autoreply', new GetGuildAutoRepliesController().handle)
router.post('/:guildId/autoreply', new CreateGuildAutoReplyController().handle)
router.delete('/:guildId/autoreply/:id', new DeleteGuildAutoReplyController().handle)

export default router

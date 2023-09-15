import { Router } from 'express'

import { forumMessageRoute } from '../services/forum/message'
import { forumTopicRoute } from '../services/forum/topic'
import { themeRoute } from '../services/theme/theme'

export const apiRoute = Router()

apiRoute
  .use('/forum/topics', forumTopicRoute)
  .use('/forum/messages', forumMessageRoute)
  .use('/theme', themeRoute)

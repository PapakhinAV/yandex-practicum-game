import express, { type Request, type Response, Router } from 'express'
import { xssErrorHandler, xssValidator } from '../../middlewares/xssValidation'
import { Message } from '../../models/forum/message'
import { checkAuth } from '../../middlewares/checkAuth'

export const forumMessageRoute = Router()
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(checkAuth)
  .post('/', xssValidator(), xssErrorHandler, (req: Request, res: Response) => {
    if (res?.locals?.user) {
      Message.create({...req.body, user: res.locals.user.display_name || res.locals.user.login })
        .then(() => res.status(200).json({}))
        .catch(() => res.status(500).json({ reason: 'Error' }))
    } else {
      res.status(401).json({ reason: 'Error' })
    }
  })

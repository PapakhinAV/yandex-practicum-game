import express, { type Request, type Response, Router } from 'express'
import { Sequelize } from 'sequelize-typescript'
import { xssErrorHandler, xssValidator } from '../../middlewares/xssValidation'
import { Topic } from '../../models/forum/topic'
import { Message } from '../../models/forum/message'
import { checkAuth } from '../../middlewares/checkAuth'


export const forumTopicRoute = Router()
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(checkAuth)
  .get('/all', (_, res: Response) => {
    Topic.findAll({
      order: [[Sequelize.col('createdAt'), 'ASC']]
    })
      .then((topics: Topic[]) => res.status(200).json(topics))
      .catch(() => res.status(500).json({ reason: 'Error' }))
  })
  .get('/:id', (req: Request, res: Response) => {
    Topic.findByPk(req.params.id, {
      include: [{ model: Message }],
      order: [[Sequelize.col('messages.createdAt'), 'ASC']],
    })
      .then(topic => {
        topic ?  res.status(200).json(topic) : res.status(400).json({reason: 'Тема не найдена'})
      })
      .catch(() => res.status(500).json({ reason: 'Error' }))
  })
  .post('/', xssValidator(), xssErrorHandler, (req: Request, res: Response) => {
    if (res?.locals?.user) {
      Topic.create({ ...req.body, user: res.locals.user.display_name || res.locals.user.login })
        .then(topic => res.status(200).send({ id: topic.id }))
        .catch(() => res.status(500).json({ reason: 'Error' }))
    } else {
      res.status(401).json({ reason: 'Error' })
    }
  })

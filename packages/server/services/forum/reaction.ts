import express, { type Request, type Response, Router } from 'express'
import { Sequelize } from 'sequelize-typescript'
import { xssErrorHandler, xssValidator } from '../../middlewares/xssValidation'
import { Reaction } from '../../models/forum/reaction'
import { checkAuth } from '../../middlewares/checkAuth'

export const forumReactionRoute = Router()
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(checkAuth)
  .get('/:topicId', async (req: Request, res: Response) => {
    const { topicId } = req.params

    try {
      const reactions = await Reaction.findAll({
        attributes: ['unified', [Sequelize.fn('array_agg', Sequelize.col('userId')), 'userIds']],
        where: { topicId },
        group: ['unified'],
      })

      res.status(200).json(reactions)
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })
  .post('/', xssValidator(), xssErrorHandler, async (req: Request, res: Response) => {
    const { unified, topicId, userId } = req.body

    try {
      const existingReaction = await Reaction.findOne({
        where: { unified, topicId, userId },
      })

      if (existingReaction) {
        res.status(400).json({ error: 'Такая запись Reaction уже существует' })
      }

      const reaction = await Reaction.create({ unified, topicId, userId })

      res.status(200).json(reaction)
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })
  .delete('/', xssValidator(), xssErrorHandler, async (req: Request, res: Response) => {
    const { unified, topicId, userId } = req.body

    try {
      const deletedCount = await Reaction.destroy({
        where: { unified, topicId, userId },
      })

      if (deletedCount === 0) {
        res.status(404).json({ error: 'Запись не найдена' })
      }

      res.json({ message: 'Запись успешно удалена' })
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })

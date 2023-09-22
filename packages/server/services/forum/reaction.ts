import express, { type Request, type Response, Router } from 'express'
import { Sequelize } from 'sequelize-typescript'
import { xssErrorHandler, xssValidator } from '../../middlewares/xssValidation'
import { Reaction } from '../../models/forum/reaction'
import { checkAuth } from '../../middlewares/checkAuth'
import { sequelize } from '../../db'

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
    const { unified, topicId } = req.body
    const userId = res.locals.user?.id

    try {
      if (userId) {
        const reaction = await sequelize.transaction(async transaction => {
          const existingReaction = await Reaction.findOne({
            where: { unified, topicId, userId },
            transaction
          })

          if (existingReaction) {
            return existingReaction
          } else {
            return await Reaction.create({ unified, topicId, userId }, { transaction })
          }
        })

        res.status(200).json(reaction)
      } else {
        res.status(401).json({ error: 'Пользователь не аутентифицирован' })
      }
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })
  .delete('/', xssValidator(), xssErrorHandler, async (req: Request, res: Response) => {
    const { unified, topicId } = req.body
    const userId = res.locals.user?.id

    try {
      if (userId) {
        const deletedCount = await Reaction.destroy({
          where: { unified, topicId, userId },
        })
  
        if (deletedCount === 0) {
          res.status(404).json({ error: 'Запись не найдена' })
        } else {
          res.json({ message: 'Запись успешно удалена' })
        }
      } else {
        res.status(401).json({ error: 'Пользователь не аутентифицирован' })
      }
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })

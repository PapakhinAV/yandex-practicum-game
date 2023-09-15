import express, { type Response, Router } from 'express'
import { SiteTheme, UserTheme } from '../../models/themes'

export const themeRoute = Router()
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  // .use(checkAuth)
  .get('/all-themes', async (_, res: Response) => {
    try {
      const themes = await SiteTheme.findAll()
      res.json( themes )
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })
  .get('/user-theme/:userId', async (req, res: Response) => {
    try {
      const userId = req.params.userId
      const userTheme = await UserTheme.findOne({ where: { userId } })

      if (userTheme) {
        const siteTheme = await SiteTheme.findOne({ where: { theme: userTheme.theme } })
        res.json(siteTheme)
      } else {
        res.status(404).json({ error: 'Не найдена тема для данного пользователя' })
      }
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })
  .put('/user/:userId', async (req, res) => {
    try {
      const { theme } = req.body
      const { userId } = req.params
      const id = Number(userId)
      const themeExists = await SiteTheme.findOne({ where: { theme: theme } })

      if (!themeExists) {
        return res.status(400).json({ error: 'Тема не найдена' })
      }

      const userTheme = await UserTheme.findOne({ where: { userId: id } })

      if (userTheme) {
        await userTheme.update({ theme })
        return res.status(200).json({ message: 'Тема успешно обновлена' })
      } else {
        await UserTheme.create({ userId: id, theme }  as UserTheme)
        return res.status(200).json({ message: 'Тема успешно создана' })
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message })
    }
  })

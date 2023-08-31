import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import { createServer as createViteServer } from 'vite'

dotenv.config()

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer (){

  // createClientAndConnect()

  const app = express()

  app.use(cors())

  const port = Number(process.env.SERVER_PORT) || 3001
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client'))
  const storeHelpersPath = require.resolve('client/src/store/helpers.ts')

   const vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom'
    })

    app.use(vite.middlewares)


  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8',)
      template = await vite!.transformIndexHtml(url, template)

      const render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render

      const createStore = (await vite!.ssrLoadModule(storeHelpersPath)).createStore

      const configureStore = await createStore({}) // Инициируется initialStore

      const appHtml = await render(configureStore, url)

      const state = configureStore?.getState()

      const stateMarkup = `<script>window.___REDUX_STATE___=${JSON.stringify(state)}</script>`

      const html = template.replace('<!--ssr-outlet-->', stateMarkup + appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()

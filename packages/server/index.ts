import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'

dotenv.config()

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer (){

  // createClientAndConnect()

  const app = express()

  app.use(cors())

  const port = Number(process.env.SERVER_PORT) || 3001
  let vite: ViteDevServer | undefined
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client'))
  const ssrClientPath = require.resolve('client/dist-ssr/client.cjs')
  const storeHelpersPath = require.resolve('client/src/store/helpers.ts')

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom'
    })

    app.use(vite.middlewares)
  }


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
      let createStore: any

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8',
        )

        createStore = (await import(storeHelpersPath)).createStore

      } else {
        template = fs.readFileSync(
          path.resolve(srcPath, 'index.html'),
          'utf-8',
        )

        template = await vite!.transformIndexHtml(url, template)
        createStore = (await vite!.ssrLoadModule(storeHelpersPath)).createStore
      }

      let render: (store: any, url: string) => Promise<string>

      if (!isDev()) {
        render = (await import(ssrClientPath)).render
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render
      }

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

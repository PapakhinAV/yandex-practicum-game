/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import dotenv from 'dotenv'

dotenv.config()

import cors from 'cors'
import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import helmet from 'helmet'
import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'
import type { EmotionCache } from '@emotion/css'
import createEmotionServer from '@emotion/server/create-instance'
import createCache from '@emotion/cache'
import cookieParser from 'cookie-parser'
import { getUser } from './services/user/user'
import { apiRoute } from './routes/api'
import { createProxyMiddleware } from 'http-proxy-middleware'
import * as process from 'process'

import { dbConnect } from './db'

const isDev = () => process.env.NODE_ENV === 'development'

async function startServer() {

  const app = express()

  app.use('/', cors({
    credentials: true,
    origin: [
      `http://127.0.0.1:${process.env.CLIENT_PORT}`, `http://localhost:${process.env.CLIENT_PORT}`,
      `http://127.0.0.1:${process.env.SERVER_PORT}`, `http://localhost:${process.env.SERVER_PORT}`,
      'http://4tunas-ork-rush-28.ya-praktikum.tech',
      'https://4tunas-ork-rush-28.ya-praktikum.tech'
    ],
    optionsSuccessStatus: 200,
  }))

  /* eslint-disable quotes */
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'", 
            "'unsafe-inline'"
          ],
          styleSrc: [
            "'self'", 
            'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/',
            "'unsafe-inline'"
          ],
          conectSrc: [
            "'self'",
            'https://ya-praktikum.tech/',
            'http://localhost:*',
            'http://51.250.109.136',
            'https://51.250.109.136',
            'http://4tunas-ork-rush-28.ya-praktikum.tech',
            'https://4tunas-ork-rush-28.ya-praktikum.tech',
          ],
          imgSrc: [
            "'self'",
            'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/',
            'data:',
          ],
          upgradeInsecureRequests: null,
        },
      }
    })
  )
  /* eslint-enable quotes */

  app.use('/api', apiRoute)
  app.use(
    '/api/v2',
    createProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: { '*': '' },
      target: 'https://ya-praktikum.tech',
    })
  )
  app.use(cookieParser())

  let vite: ViteDevServer | undefined
  const port = Number(process.env.SERVER_PORT) || 3000
  const distPath = path.dirname(require.resolve('../client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('../client'))
  const ssrClientPath = require.resolve('../client/dist-ssr/client.cjs')


  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom'
    })

    app.use(vite.middlewares)
  }

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  await dbConnect()

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8',
        )
      } else {
        template = fs.readFileSync(
          path.resolve(srcPath, 'index.html'),
          'utf-8',
        )

        template = await vite!.transformIndexHtml(url, template)

      }

      let render: (store: any, ulr: string, cache:  EmotionCache) => Promise<string>
      let createStore: (initialStore: any) => Promise<any>

      if (!isDev()) {
        const client = await import(ssrClientPath)
        render = client.render
        createStore = client.createStore

      } else {
        const client = await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))
        render = client.render
        createStore = client.createStore
      }

      let initialStore = {}

      const user = await getUser(req.headers.cookie)

      if (user) {
        initialStore = { ...initialStore, app: { user } }
      }

      const storeInstance = await createStore(initialStore) // Инициируется initialStore

      const cacheKey = 'custom'
      const cache = createCache({ key: cacheKey })
      const { extractCritical } = createEmotionServer(cache)

      const appHtml = await render(storeInstance, url, cache)

      const { html, css, ids } = extractCritical(appHtml) // Извлечение стилей и идентификаторов

      const state = storeInstance?.getState()

      const stateMarkup = `<script>window.___REDUX_STATE___=${JSON.stringify(state)}</script>`

      const finalHtml = template
        .replace('<!--ssr-outlet-->', stateMarkup + html)
        .replace('</head>', `<style data-emotion="${cacheKey} ${ids.join(' ')}">${css}</style></head>`)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml)
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

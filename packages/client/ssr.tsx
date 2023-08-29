
// @ts-ignore
import React from 'react'
import App from './src/App/App'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'

export function render(store, url) {
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  )
}

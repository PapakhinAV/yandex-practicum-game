import * as React from 'react'
import App from './src/App/App'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './src/store/reducer'
import { CacheProvider } from '@emotion/react'

export function render(store, url, cache) {

  return renderToString (
    <CacheProvider value={cache}>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </CacheProvider>
  )
}

export function createStore(preloadedState: any) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState
  })

  return store
}




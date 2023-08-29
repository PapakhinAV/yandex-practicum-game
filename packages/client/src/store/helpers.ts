import rootReducer from './reducer'
import { configureStore } from '@reduxjs/toolkit'

export function createStore(preloadedState: any) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState
  })

  return store
}



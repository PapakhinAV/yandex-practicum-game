import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer'
import { authApi } from '../api/auth'
import { userApi } from '../api/user'
import { leaderboardApi } from '../api/leaderboard'

const preloadedState = window?.___REDUX_STATE___ || {}
delete window.___REDUX_STATE___

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, leaderboardApi.middleware),
  preloadedState: preloadedState
})

export type AppDispatch = typeof store.dispatch;

export default store

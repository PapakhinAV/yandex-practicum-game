import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer'
import { authApi } from '../api/auth'
import { oauthApi } from '../api/oauth'
import { userApi } from '../api/user'
import { leaderboardApi } from '../api/leaderboard'
import { themeApi } from '../api/theme'
import { forumApi } from '../api/forum'

const preloadedState = window?.___REDUX_STATE___ || {}
delete window.___REDUX_STATE___

const middlewares = [authApi.middleware, oauthApi.middleware, userApi.middleware, leaderboardApi.middleware, forumApi.middleware, themeApi.middleware]

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(...middlewares),
  preloadedState: preloadedState
})

export type AppDispatch = typeof store.dispatch;

export default store

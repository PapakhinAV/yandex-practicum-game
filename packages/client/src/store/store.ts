import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer'
import { authApi } from '../api/auth'
import { userApi } from '../api/user'
import { leaderboardApi } from '../api/leaderboard'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, leaderboardApi.middleware),
})

export type AppDispatch = typeof store.dispatch;

export default store

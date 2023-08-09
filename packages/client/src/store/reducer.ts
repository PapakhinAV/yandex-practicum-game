import { combineReducers } from '@reduxjs/toolkit'
import appReducer from './appReducer'
import gameSlice from '../pages/Game/gameSlice'
import { IRootState } from './types'
import { authApi } from '../api/auth'
import { userApi } from '../api/user'
import { leaderboardApi } from '../api/leaderboard'

const rootReducer = combineReducers<IRootState>({
  app: appReducer,
  game: gameSlice,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [leaderboardApi.reducerPath]: leaderboardApi.reducer,
})

export default rootReducer

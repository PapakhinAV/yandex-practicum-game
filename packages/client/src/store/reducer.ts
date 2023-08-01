import { combineReducers } from '@reduxjs/toolkit'
import appReducer from './appReducer'
import gameSlice from '../pages/Game/gameSlice'
import { IRootState } from './types'
import { authApi } from '../reducers/auth'
import { userApi } from '../reducers/user'

const rootReducer = combineReducers<IRootState>({
  app: appReducer,
  game: gameSlice,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
})

export default rootReducer

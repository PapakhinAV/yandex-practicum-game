import { combineReducers } from '@reduxjs/toolkit'
import appReducer from './appReducer'
import gameSlice from '../pages/Game/gameSlice'
import { IRootState } from './types'

const rootReducer = combineReducers<IRootState>({
  app: appReducer,
  game: gameSlice,
})

export default rootReducer

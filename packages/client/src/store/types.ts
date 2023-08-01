import { IGameState } from '../pages/Game/gameSlice'
import { IAppState } from './appReducer'
import { Reducer } from '@reduxjs/toolkit'

export interface IRootState {
  app: IAppState
  game: IGameState
  authApi: ReturnType<Reducer>
  userApi: ReturnType<Reducer>
}

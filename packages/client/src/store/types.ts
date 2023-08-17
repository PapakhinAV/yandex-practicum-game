import { IGameState } from '../pages/Game/gameSlice'
import { Reducer } from '@reduxjs/toolkit'

export interface IUserState {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  login: string
  avatar: string | null
  email: string
  phone: string
}

export interface IAppState {
  user: IUserState | null
  loginError: boolean
  registerError: boolean
}

export interface IRootState {
  app: IAppState
  game: IGameState
  authApi: ReturnType<Reducer>
  userApi: ReturnType<Reducer>
  leaderboardApi: ReturnType<Reducer>
}

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
  errorMessage: string | null
}

export interface IRootState {
  app: IAppState
  game: IGameState
  authApi: ReturnType<Reducer>
  userApi: ReturnType<Reducer>
  leaderboardApi: ReturnType<Reducer>
  forumApi: ReturnType<Reducer>
}

export interface IResponse {
  data?: string
  error?: {
    data: {
      status: number
      reason: string
    }
  }
}

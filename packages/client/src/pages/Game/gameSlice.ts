import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRootState } from '../../store/types'

const reducerName = 'game'

export enum EGameStatus {
  INITIAL = 'INITIAL',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER'
}

export interface IGameState {
  score: number
  hearts: number
  coins: number
  status: EGameStatus
}

const initialState: IGameState = {
  score: 0,
  hearts: 0,
  coins: 0,
  status: EGameStatus.INITIAL
}

const gameSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    newGame: (
      state: IGameState,
      action: PayloadAction<{ 
        hearts?: number; 
        coins?: number; 
        score?: number; 
        status?: EGameStatus 
      }>
    ) => {
      const { 
        hearts = 5, 
        coins = 20, 
        score = 0, 
        status = EGameStatus.PLAYING,
      } = action.payload

      state.hearts = hearts
      state.score = score
      state.coins = coins
      state.status = status
    },
    setHearts: (state: IGameState, action: PayloadAction<number>) => {
      state.hearts = action.payload
    },
    addCoins: (state: IGameState, action: PayloadAction<number>) => {
      state.coins += action.payload
    },
    removeCoins: (state: IGameState, action: PayloadAction<number>) => {
      state.coins -= action.payload
    },
    addScore: (state: IGameState, action: PayloadAction<number>) => {
      state.score += action.payload
    },
    updateStatus: (state: IGameState, action: PayloadAction<EGameStatus>) => {
      state.status = action.payload
    }
  },
})

export const { 
  newGame, 
  setHearts, 
  addCoins, 
  removeCoins, 
  addScore, 
  updateStatus 
} = gameSlice.actions

export default gameSlice.reducer

export const getHearts = (state: IRootState) => state[reducerName].hearts
export const getCoins = (state: IRootState) => state[reducerName].coins
export const getScore = (state: IRootState) => state[reducerName].score
export const getStatus = (state: IRootState) => state[reducerName].status

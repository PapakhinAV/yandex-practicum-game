import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRootState } from '../../store/types'

const reducerName = 'game'

export interface IGameState {
  score: number
  hearts: number
  coins: number
}

const initialState: IGameState = {
  score: 0,
  hearts: 0,
  coins: 0,
}

const gameSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    newGame: (
      state: IGameState,
      action: PayloadAction<{ hearts?: number; coins?: number }>
    ) => {
      const { hearts = 5, coins = 20 } = action.payload

      state.hearts = hearts
      state.score = 0
      state.coins = coins
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
  },
})

export const { newGame, setHearts, addCoins, removeCoins } = gameSlice.actions

export default gameSlice.reducer

export const getHearts = (state: IRootState) => state[reducerName].hearts
export const getCoins = (state: IRootState) => state[reducerName].coins

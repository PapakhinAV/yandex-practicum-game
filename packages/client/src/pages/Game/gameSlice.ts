import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IRootState } from '../../store/types'

const reducerName = 'game'

export interface IGameState {
  score: number
  hearts: number
}

const initialState: IGameState = {
  score: 0,
  hearts: 0,
}

const gameSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    newGame: (
      state: IGameState,
      action: PayloadAction<{ hearts?: number }>
    ) => {
      const { hearts = 5 } = action.payload

      state.hearts = hearts
      state.score = 0
    },
    setHearts: (state: IGameState, action: PayloadAction<number>) => {
      state.hearts = action.payload
    },
  },
})

export const { newGame, setHearts } = gameSlice.actions

export default gameSlice.reducer

export const getHearts = (state: IRootState) => state[reducerName].hearts

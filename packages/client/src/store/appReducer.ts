import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Пример-заготовка под стейт приложения.

interface IUserState {
  name: string
  id: number
}

interface ISettingsState {
  sound: boolean
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface IAppState {
  user: IUserState
  settings: ISettingsState
}

const initialState: IAppState = {
  user: {
    name: '',
    id: 0,
  },
  settings: {
    sound: true,
    difficulty: 'medium',
  },
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.user = action.payload
    },
    setSettings: (state, action: PayloadAction<ISettingsState>) => {
      state.settings = action.payload
    },
  },
})

export const { setUser, setSettings } = appSlice.actions

export default appSlice.reducer

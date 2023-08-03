import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../api/auth'
import { userApi } from '../api/user'

// Пример-заготовка под стейт приложения.

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

interface ISettingsState {
  sound: boolean
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface IAppState {
  user: IUserState | null
  settings: ISettingsState
}

const initialState: IAppState = {
  user: null,
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
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload
      }
    )
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, state => {
      state.user = null
    })
    builder.addMatcher(
      userApi.endpoints.changeProfile.matchFulfilled,
      (state, { payload }) => {
        state.user = payload
      }
    )
    builder.addMatcher(
      userApi.endpoints.changeAvatarProfile.matchFulfilled,
      (state, { payload }) => {
        state.user = payload
      }
    )
  },
})

export const { setUser, setSettings } = appSlice.actions

export default appSlice.reducer

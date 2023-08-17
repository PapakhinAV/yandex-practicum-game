import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../api/auth'
import { userApi } from '../api/user'
import { IAppState, IUserState } from './types'

const initialState: IAppState = {
  user: null,
  loginError: false,
  registerError: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.user = action.payload
    },
    setLoginError: state => {
      state.loginError = true
    },
    setRegisterError: state => {
      state.registerError = true
    }
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

export const { setUser, setLoginError, setRegisterError } = appSlice.actions

export default appSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../api/auth'
import { userApi } from '../api/user'
import { IAppState, IUserState } from './types'

const initialState: IAppState = {
  user: null,
  isAuth: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.user = action.payload
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.isAuth = true
        state.user = payload
      }
    )
    builder.addMatcher(authApi.endpoints.signup.matchFulfilled, state => {
      state.isAuth = true
    })
    builder.addMatcher(authApi.endpoints.signin.matchFulfilled, state => {
      state.isAuth = true
    })
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, state => {
      state.isAuth = false
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

export const { setUser } = appSlice.actions

export default appSlice.reducer

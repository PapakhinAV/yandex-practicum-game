import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../api/auth'
import { userApi } from '../api/user'
import { IAppState, IUserState } from './types'
import { signinAndFetchUser, signupAndFetchUser } from './Thunk'
import { EThemes } from '../types/EThemes'
import { themeApi } from '../api/theme'

const initialState: IAppState = {
  user: null,
  errorMessage: '',
  theme: EThemes.DAY
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.user = action.payload
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload
    },
    resetErrorMessage: state => {
      state.errorMessage = null
    },
  },
  extraReducers: builder => {
    builder.addCase(signinAndFetchUser.fulfilled, (state, action) => {
      state.user = action.payload?.data ? action.payload.data : null
    })
    builder.addCase(signupAndFetchUser.fulfilled, (state, action) => {
      state.user = action.payload?.data ? action.payload.data : null
    })
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
    builder.addMatcher(
      themeApi.endpoints.getUserTheme.matchFulfilled,
      (state, { payload }) => {
        state.theme = payload.theme
      }
    )
  },
})

export const { setUser, setErrorMessage, resetErrorMessage } = appSlice.actions

export default appSlice.reducer

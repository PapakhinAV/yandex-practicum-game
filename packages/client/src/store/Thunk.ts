import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../api/auth'
import { setErrorMessage } from './appReducer'
import { ILogin } from '../pages/Login/types'
import { IResponse } from './types'

export const signinAndFetchUser = createAsyncThunk(
  'auth/signinAndFetchUser',
  async (userData: ILogin, thunkAPI) => {

    const signinResult = await thunkAPI.dispatch(authApi.endpoints.signin.initiate(userData)) as IResponse
 
    if (signinResult.data) {
      return await thunkAPI.dispatch(authApi.endpoints.getUser.initiate())
    } else if (signinResult.error?.data) {
      const error = JSON.parse(signinResult.error.data.reason)
      thunkAPI.dispatch(setErrorMessage(error))
    }
  }
)

export const signupAndFetchUser = createAsyncThunk(
  'auth/signUpAndFetchUser',
  async (userData: Record<string, string>, thunkAPI) => {

    const signupResult = await thunkAPI.dispatch(authApi.endpoints.signup.initiate(userData)) as IResponse

    if (signupResult?.data) {
      return await thunkAPI.dispatch(authApi.endpoints.getUser.initiate())
    } else if (signupResult.error?.data) {
      const error = signupResult.error.data.reason 
      thunkAPI.dispatch(setErrorMessage(error))
    }
  }
)

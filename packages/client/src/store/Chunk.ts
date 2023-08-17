import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../api/auth'
import { setLoginError, setRegisterError } from './appReducer'
import { IRegister } from '../pages/Register/types'
import { ILogin } from '../pages/Login/types'

export const signinAndFetchUser = createAsyncThunk(
  'auth/signinAndFetchUser',
  async (userData: ILogin, thunkAPI) => {

    const signinResult: Record<string, unknown> = await thunkAPI.dispatch(authApi.endpoints.signin.initiate(userData))
 
    if (signinResult.data) {
      return await thunkAPI.dispatch(authApi.endpoints.getUser.initiate())
    } else {
      thunkAPI.dispatch(setLoginError())
    }
  }
)

export const signupAndFetchUser = createAsyncThunk(
  'auth/signUpAndFetchUser',
  async (userData: IRegister, thunkAPI) => {

    const signinResult: Record<string, unknown> = await thunkAPI.dispatch(authApi.endpoints.signup.initiate(userData))

    if (signinResult?.data) {
      return await thunkAPI.dispatch(authApi.endpoints.getUser.initiate())
    } else {
      thunkAPI.dispatch(setRegisterError())
    }
  }
)

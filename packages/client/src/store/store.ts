import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer'
import { authApi } from '../reducers/auth'
import { userApi } from '../reducers/user'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
})

export default store

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUserState } from '../store/types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v2/auth',
    credentials: 'include',
  }),
  endpoints: builder => ({
    getUser: builder.query<IUserState, void>({
      query: () => 'user',
    }),
    signin: builder.mutation({
      query: body => ({
        url: 'signin',
        method: 'POST',
        body,
        responseHandler: 'text',
      }),
    }),
    signup: builder.mutation({
      query: body => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<string, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
        responseHandler: 'text',
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserQuery, useSigninMutation, useSignupMutation, useLogoutMutation } = authApi

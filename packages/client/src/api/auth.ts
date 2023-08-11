import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUserState } from '../store/types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ya-praktikum.tech/api/v2/auth',
    credentials: 'include',
  }),
  endpoints: builder => ({
    getUser: builder.query<IUserState, void>({
      query: () => 'user',
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
export const { useGetUserQuery, useLogoutMutation } = authApi

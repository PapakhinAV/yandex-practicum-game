import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${__SERVER_API__}/api/v2/user`,
    method: 'PUT',
    credentials: 'include',
  }),
  endpoints: builder => ({
    changeProfile: builder.mutation({
      query: body => ({
        url: 'profile',
        body,
      }),
    }),
    changeAvatarProfile: builder.mutation({
      query: body => ({
        url: 'profile/avatar',
        body,
      }),
    }),
    changePassword: builder.mutation({
      query: body => ({
        url: 'password',
        body,
        responseHandler: 'text',
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useChangeProfileMutation,
  useChangeAvatarProfileMutation,
  useChangePasswordMutation,
} = userApi

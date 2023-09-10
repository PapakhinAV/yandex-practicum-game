import type { OauthSignInRequest, GetServiceIdResponse } from './types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const oauthApi = createApi({
  reducerPath: 'oauthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ya-praktikum.tech/api/v2',
    credentials: 'include',
    prepareHeaders(headers) {
      return headers
    },
  }),
  endpoints: builder => ({
    oauthSignin: builder.mutation<void, OauthSignInRequest>({
      query: body => ({
        url: '/oauth/yandex',
        method: 'POST',
        body,
        responseHandler: 'text',
      }),
    }),
    getServiceId: builder.query<GetServiceIdResponse, string>({
      query: redirect_url => ({
        url: '/oauth/yandex/service-id',
        params: {
          redirect_url,
        },
      }),
    }),
  }),
})

export const { useOauthSigninMutation, useGetServiceIdQuery } = oauthApi

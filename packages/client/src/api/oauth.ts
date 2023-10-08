import type { OauthSignInRequest, GetServiceIdResponse } from './types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const oauthApi = createApi({
  reducerPath: 'oauthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${__SERVER_API__}/api/v2/oauth`,
    credentials: 'include',
    prepareHeaders(headers) {
      return headers
    },
  }),
  endpoints: builder => ({
    oauthSignin: builder.mutation<void, OauthSignInRequest>({
      query: body => ({
        url: 'yandex',
        method: 'POST',
        body,
        responseHandler: 'text',
      }),
    }),
    getServiceId: builder.query<GetServiceIdResponse, string>({
      query: redirect_uri => ({
        url: 'yandex/service-id',
        params: {
          redirect_uri,
        },
      }),
    }),
  }),
})

export const { useOauthSigninMutation, useGetServiceIdQuery } = oauthApi

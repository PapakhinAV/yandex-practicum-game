import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TEAM_NAME } from '../App/constants'

interface ILeaderboardQuery {
  ratingFieldName: string
  cursor: number
  limit: number
}

interface ILeaderboard {
  scope: number
  username: string
  difficulty: string

}

export const leaderboardApi = createApi({
  reducerPath: 'leaderboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ya-praktikum.tech/api/v2/leaderboard',
    credentials: 'include',
    method: 'Post',
  }),
  endpoints: builder => ({
    getLeaderboard: builder.query<Array<Record<string,ILeaderboard>>,ILeaderboardQuery>({
      query: body => ({
        url: TEAM_NAME,
        body,
      }),
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg
      },
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLeaderboardQuery } = leaderboardApi

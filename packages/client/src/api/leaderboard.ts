import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TEAM_NAME } from '../App/constants'

interface ILeaderboardQuery {
  ratingFieldName: string
  cursor: number
  limit: number
}

interface ILeaderboard {
  score: number
  username: string
  id: number

}

export const leaderboardApi = createApi({
  reducerPath: 'leaderboardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${__SERVER_API__}/api/v2/leaderboard`,
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
    addScore: builder.mutation({
      query: data => ({
        url: '',
        method: 'POST',
        body: {
          data,
          teamName: TEAM_NAME,
          ratingFieldName: 'score'
        },
        responseHandler: 'text',
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetLeaderboardQuery, 
  useAddScoreMutation 
} = leaderboardApi

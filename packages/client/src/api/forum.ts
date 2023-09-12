import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TMessage } from '../pages/ForumTopic/types'

interface ITopic {
  id: number
  name: string
  body: string
  createdAt: string
  messages: TMessage[]
  user: string
}
export const forumApi = createApi({
  reducerPath: 'forumApi',
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/forum',
    credentials: 'include',
  }),
  endpoints: builder => ({
    getTopics: builder.query<any, void>({
      query: () => 'topics/all',
    }),
    createTopic: builder.mutation({
      query: body => ({
        method: 'POST',
        url: 'topics',
        body,
      }),
    }),
    getTopic: builder.query<ITopic, number>({
      query: id => `topics/${id}`,
    }),
    createMessage: builder.mutation({
      query: body => ({
        method: 'POST',
        url: 'messages',
        body,
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTopicsQuery, useCreateTopicMutation, useGetTopicQuery, useCreateMessageMutation } = forumApi

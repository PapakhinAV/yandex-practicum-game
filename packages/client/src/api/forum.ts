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

interface IReaction {
  unified: string
  userIds: number[]
}

export const forumApi = createApi({
  reducerPath: 'forumApi',
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${__SERVER_API__}/api/forum`,
    credentials: 'include',
  }),
  tagTypes: ['Reactions'],
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
    getReactions: builder.query<IReaction[], number>({
      query: topicId => `reactions/${topicId}`,
      providesTags: (result, error, topicId) => [{ type: 'Reactions', id: topicId }],
    }),
    addReaction: builder.mutation({
      query: body => ({
        method: 'POST',
        url: 'reactions',
        body,
      }),
      invalidatesTags: (result, error, { topicId }) => [{ type: 'Reactions', id: topicId }],
    }),
    deleteReaction: builder.mutation({
      query: body => ({
        method: 'DELETE',
        url: 'reactions',
        body,
      }),
      invalidatesTags: (result, error, { topicId }) => [{ type: 'Reactions', id: topicId }],
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTopicsQuery,
  useCreateTopicMutation,
  useGetTopicQuery,
  useCreateMessageMutation,
  useGetReactionsQuery,
  useAddReactionMutation,
  useDeleteReactionMutation
} = forumApi

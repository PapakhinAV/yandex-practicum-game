import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ISiteTheme } from '../types/ISiteTheme'

export const themeApi = createApi({
  reducerPath: 'themeApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/theme' }),
  tagTypes: ['UserTheme'],
  endpoints: builder => ({
    getAllThemes: builder.query<ISiteTheme[], void>({
      query: () => 'all-themes',
    }),
    getUserTheme: builder.query<ISiteTheme, any>({
      query: (userId: number) => `user-theme/${userId}`,
      providesTags: ['UserTheme'],
    }),
    updateUserTheme: builder.mutation<any, { userId: number, theme: string }>({
      query: ({ userId, theme }) => {

        return {
          url: `user/${userId}`,
          method: 'PUT',
          body: { theme },
        }
      },
      invalidatesTags: ['UserTheme'],
    }),
  }),
})

export const {
  useGetAllThemesQuery,
  useGetUserThemeQuery,
  useUpdateUserThemeMutation,
} = themeApi

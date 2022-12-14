import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IVocabulary } from '../../models'

export const vocabularyApi = createApi({
  reducerPath: 'vocabularyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),
  tagTypes: ['Vocabulary'],
  endpoints: build => ({
    // TODO: type query arg
    getVocabulary: build.query<IVocabulary, string>({
      query: (id: string) => ({
        url: `vocabularies/${id}`,
      }),
      providesTags: ['Vocabulary'],
    }),
    // TODO: type
    addCard: build.mutation<any, { wordName: string, vocabularyId: string }>({
      query: (body) => ({
        url: 'cards',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error) => error ? [] : ['Vocabulary'],
    }),
    // TODO: type
    removeCard: build.mutation<any, string>({
      query: (id) => ({
        url: `cards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error) => error ? [] : ['Vocabulary'],
    })
  }),
})

export const {
  useGetVocabularyQuery,
  useAddCardMutation,
  useRemoveCardMutation,
} = vocabularyApi

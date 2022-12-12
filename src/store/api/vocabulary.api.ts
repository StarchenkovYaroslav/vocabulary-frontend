import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IVocabulary } from '../../models'

export const vocabularyApi = createApi({
  reducerPath: 'vocabularyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),
  endpoints: build => ({
    // TODO: type query arg
    getVocabulary: build.query<IVocabulary, string>({
      query: (id: string) => ({
        url: `vocabularies/${id}`,
      }),
    }),
    // TODO: type
    addCard: build.mutation<any, { wordName: string, vocabularyId: string }>({
      query: (body) => ({
        url: 'cards',
        method: 'POST',
        body,
      })
    }),
    // TODO: type
    removeCard: build.mutation<any, string>({
      query: (id) => ({
        url: `cards/${id}`,
        method: 'DELETE',
      }),
    })
  }),
})

export const {
  useGetVocabularyQuery,
  useAddCardMutation,
  useRemoveCardMutation,
} = vocabularyApi

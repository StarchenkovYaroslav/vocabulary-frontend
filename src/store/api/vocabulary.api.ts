import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IVocabulary } from '../../models'

export const vocabularyApi = createApi({
  reducerPath: 'vocabularyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),
  endpoints: build => ({
    // TODO: type query arg
    getVocabulary: build.query<IVocabulary, any>({
      query: (id: string) => ({
        url: `vocabularies/${id}`,
      }),
    }),
    // TODO: type
    addCard: build.mutation<any, any>({
      query: (body: { wordName: string, vocabularyId: string }) => ({
        url: 'cards',
        method: 'POST',
        body,
      })
    })
  }),
})

export const { useGetVocabularyQuery, useAddCardMutation } = vocabularyApi

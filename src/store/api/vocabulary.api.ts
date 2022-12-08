import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IVocabulary } from '../../models'

export const vocabularyApi = createApi({
  reducerPath: 'vocabularyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),
  endpoints: build => ({
    getVocabulary: build.query<IVocabulary, any>({
      query: (id: string) => ({
        url: `vocabularies/${id}`,
      })
    }),
  }),
})

export const { useGetVocabularyQuery } = vocabularyApi

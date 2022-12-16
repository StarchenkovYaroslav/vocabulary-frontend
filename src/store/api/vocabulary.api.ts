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
    }),
    // TODO: type
    createMeaning: build.mutation<any, { name: string, cardId: string }>({
      query: (body) => ({
        url: 'meanings',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error) => error ? [] : ['Vocabulary'],
    }),
    // TODO: type
    removeMeaning: build.mutation<any, string>({
      query: (id) => ({
        url: `meanings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error) => error ? [] : ['Vocabulary'],
    }),
    // TODO: type
    removeTranslation: build.mutation<any, { meaningId: string, translationId: string }>({
      query: ({ meaningId, ...body }) => ({
        url: `meanings/${meaningId}/translations`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: (result, error) => error ? [] : ['Vocabulary'],
    }),
    // TODO: type
    addTranslation: build.mutation<any, { meaningId: string, translationName: string }>({
      query: ({ meaningId, ...body }) => ({
        url: `meanings/${meaningId}/translations`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error) => error ? [] : ['Vocabulary'],
    })
  }),
})

export const {
  useGetVocabularyQuery,
  useAddCardMutation,
  useRemoveCardMutation,
  useCreateMeaningMutation,
  useRemoveMeaningMutation,
  useRemoveTranslationMutation,
  useAddTranslationMutation,
} = vocabularyApi

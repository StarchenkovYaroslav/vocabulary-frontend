import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IVocabulary } from '../../../models'
import {
  AddCardRequest,
  AddTranslationRequest,
  CreateMeaningRequest,
  GetVocabularyRequest,
  RemoveCardRequest,
  RemoveMeaningRequest,
  RemoveTranslationRequest,
} from './request-types'

export const vocabularyApi = createApi({
  reducerPath: 'vocabularyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),
  tagTypes: ['Vocabulary'],
  endpoints: build => ({
    // TODO: type query arg
    getVocabulary: build.query<IVocabulary, GetVocabularyRequest>({
      query: (id: string) => ({
        url: `vocabularies/${id}`,
      }),
      providesTags: ['Vocabulary'],
    }),
    // TODO: type
    addCard: build.mutation<any, AddCardRequest>({
      query: (body) => ({
        url: 'cards',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error) => error ? [] : ['Vocabulary'],
    }),
    // TODO: type
    removeCard: build.mutation<any, RemoveCardRequest>({
      query: (id) => ({
        url: `cards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error) => error ? [] : ['Vocabulary'],
    }),
    // TODO: type
    createMeaning: build.mutation<any, CreateMeaningRequest>({
      query: (body) => ({
        url: 'meanings',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error) => error ? [] : ['Vocabulary'],
    }),
    // TODO: type
    removeMeaning: build.mutation<any, RemoveMeaningRequest>({
      query: (id) => ({
        url: `meanings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error) => error ? [] : ['Vocabulary'],
    }),
    // TODO: type
    removeTranslation: build.mutation<any, RemoveTranslationRequest>({
      query: ({ meaningId, ...body }) => ({
        url: `meanings/${meaningId}/translations`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: (result, error) => error ? [] : ['Vocabulary'],
    }),
    // TODO: type
    addTranslation: build.mutation<any, AddTranslationRequest>({
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

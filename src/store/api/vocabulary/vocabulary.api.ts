import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IVocabulary } from '../../../models'
import {
  AddCardRequest,
  AddTranslationRequest,
  AddMeaningRequest,
  GetVocabularyRequest,
  RemoveCardRequest,
  RemoveMeaningRequest,
  RemoveTranslationRequest,
  EditTranslationRequest,
  EditMeaningRequest,
} from './request-types'

// TODO: type responses
export const vocabularyApi = createApi({
  reducerPath: 'vocabularyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),
  tagTypes: ['Vocabulary'],
  endpoints: build => ({
    getVocabulary: build.query<IVocabulary, GetVocabularyRequest>({
      query: (id: string) => ({
        url: `vocabularies/${id}`,
      }),
      providesTags: ['Vocabulary'],
    }),
    addCard: build.mutation<any, AddCardRequest>({
      query: (body) => ({
        url: 'cards',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error) => error ? [] : ['Vocabulary'],
    }),
    removeCard: build.mutation<any, RemoveCardRequest>({
      query: (id) => ({
        url: `cards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error) => error ? [] : ['Vocabulary'],
    }),
    addMeaning: build.mutation<any, AddMeaningRequest>({
      query: (body) => ({
        url: 'meanings',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error) => error ? [] : ['Vocabulary'],
    }),
    removeMeaning: build.mutation<any, RemoveMeaningRequest>({
      query: (id) => ({
        url: `meanings/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error) => error ? [] : ['Vocabulary'],
    }),
    removeTranslation: build.mutation<any, RemoveTranslationRequest>({
      query: ({ meaningId, ...body }) => ({
        url: `meanings/${meaningId}/translations`,
        method: 'DELETE',
        body,
      }),
      invalidatesTags: (result, error) => error ? [] : ['Vocabulary'],
    }),
    addTranslation: build.mutation<any, AddTranslationRequest>({
      query: ({ meaningId, ...body }) => ({
        url: `meanings/${meaningId}/translations`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error) => error ? [] : ['Vocabulary'],
    }),
    editTranslation: build.mutation<any, EditTranslationRequest>({
      query: ({ meaningId, ...body }) => ({
        url: `meanings/${meaningId}/translations`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error) => error ? [] : ['Vocabulary'],
    }),
    editMeaning: build.mutation<any, EditMeaningRequest>({
      query: ({ id, ...body }) => ({
        url: `meanings/${id}`,
        method: 'PATCH',
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
  useAddMeaningMutation,
  useRemoveMeaningMutation,
  useRemoveTranslationMutation,
  useAddTranslationMutation,
  useEditTranslationMutation,
  useEditMeaningMutation,
} = vocabularyApi

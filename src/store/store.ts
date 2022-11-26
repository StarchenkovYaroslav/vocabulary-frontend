import { configureStore } from '@reduxjs/toolkit'
import { vocabularyApi } from './api'

export const store = configureStore({
  reducer: {
    [vocabularyApi.reducerPath]: vocabularyApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(vocabularyApi.middleware),
})

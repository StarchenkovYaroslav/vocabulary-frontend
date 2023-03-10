import { configureStore } from '@reduxjs/toolkit'
import { vocabularyApi } from './api'
import { messageReducer } from './slices'

export const store = configureStore({
  reducer: {
    [vocabularyApi.reducerPath]: vocabularyApi.reducer,
    message: messageReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(vocabularyApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

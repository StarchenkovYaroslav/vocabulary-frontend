import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { MessageInstance } from 'antd/es/message/interface';

interface MessageState {
  message: MessageInstance | null
}

const initialState: MessageState = {
  message: null
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    initMessage(state, action: PayloadAction<MessageInstance>) {
      state.message = action.payload
    }
  }
})

export const messageActions = messageSlice.actions
export const messageReducer = messageSlice.reducer

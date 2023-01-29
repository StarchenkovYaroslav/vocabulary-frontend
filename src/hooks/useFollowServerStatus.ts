import { QueryStatus } from '@reduxjs/toolkit/query'
import { useEffect } from 'react'
import { useTypedSelector } from './useTypedSelector'

enum initialMessage {
  success = 'Успешно',
  error = 'Ошибка',
}

interface Params {
  status: QueryStatus
  successMessage?: string
  errorMessage?: string
}

export const useFollowServerStatus = ({
  status,
  successMessage,
  errorMessage,
}: Params) => {
  const { message } = useTypedSelector(state => state.message)

  useEffect(() => {
    if (status === QueryStatus.fulfilled) {
      message?.success(successMessage || initialMessage.success)
    }
    if (status === QueryStatus.rejected) {
      message?.error(errorMessage || initialMessage.error)
    }
  }, [status])
}

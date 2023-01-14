import React, { useEffect } from 'react'
import { App } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'

let message: MessageInstance

export default () => {
  console.log('lalala')
  const staticFunction = App.useApp()
  message = staticFunction.message
  return null
};

export { message }

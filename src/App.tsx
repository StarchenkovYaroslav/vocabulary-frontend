import React from 'react'
import { VocabularyPage } from './pages/vocabulary'
import { useActions } from './hooks'
import { message } from 'antd'

function App() {
  const { initMessage } = useActions()
  const [messageApi, contextHolder] = message.useMessage();

  initMessage(messageApi)

  return (
    <>
      {contextHolder}
      <VocabularyPage />
    </>
  );
}

export default App;

import React, { FC, useEffect, useState } from 'react'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { message } from 'antd'
import { useAddCardMutation, useGetVocabularyQuery } from '../../../../store/api'
import { List } from '../../../../ui'
import { WordCard } from '../WordCard'
import { WordInfo } from '../WordInfo'
import { CardForm } from '../CardForm'
import { ICard } from '../../../../models'
import './Vocabulary.css'

// TODO: handle hardcore
const vocabularyId = '6371617f94613befa4ca49a2'

const Vocabulary: FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<string>('')

  const {
    isLoading: isVocabularyLoading,
    isError: isVocabularyError,
    data: vocabulary,
  } = useGetVocabularyQuery(vocabularyId)

  const [addCard, { status }] = useAddCardMutation()

  const [messageApi, contextHolder] = message.useMessage();

  const selectedCard = vocabulary
    ? vocabulary.cards.find(card => card._id === selectedCardId)
    : null

  const selectCard = (cardId: string) => {
    setSelectedCardId(cardId)
  }

  // TODO: type data
  const handleAddCard = async (data: { wordName: string }) => {
    await addCard({ vocabularyId, ...data })
  }

  const showSuccessMessage = () => {
    messageApi.info('Дабавлено')
  }

  const showErrorMessage = () => {
    messageApi.error('Ошибка')
  }

  useEffect(() => {
    if (status === QueryStatus.fulfilled) showSuccessMessage()
    if (status === QueryStatus.rejected) showErrorMessage()
  }, [status])

  if (isVocabularyLoading) return <div>Loading...</div>
  if (isVocabularyError) return <div>Error occurred</div>

  return (
    <>
      {contextHolder}
      <div className="vocabulary">
        <h1 className="vocabulary__title">{vocabulary?.name}</h1>
        <CardForm onSubmit={handleAddCard}/>
        <List<ICard>
          data={vocabulary?.cards!}
          getItemKey={card => card._id}
          renderItem={card => (
            <WordCard
              card={card}
              isSelected={card._id === selectedCardId}
              onClick={selectCard}
            />
          )}
          listClassName="vocabulary__card-list"
          itemClassName="vocabulary__card-item"
        />
        <div className="vocabulary__card-info">
          {selectedCard
            ? <WordInfo card={selectedCard} />
            : <div>Слово не выбрано</div>
          }
        </div>
      </div>
    </>
  )
}

export default Vocabulary

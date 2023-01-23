import React, { FC, useState } from 'react'
import { useAddCardMutation, useGetVocabularyQuery } from '../../../../store/api'
import { ScrollableWithHeader } from '../../../../ui'
import { WordInfo } from '../WordInfo'
import { CardForm } from '../CardForm'
import { useFollowSeverStatus } from '../../../../hooks'
import { WordCardList } from '../WordCardList'
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

  const [addCard, { status: addingCardStatus }] = useAddCardMutation()

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

  useFollowSeverStatus({ status: addingCardStatus })

  if (isVocabularyLoading) return <div>Loading...</div>
  if (isVocabularyError) return <div>Error occurred</div>

  return (
    <div className="vocabulary">
      <h1 className="vocabulary__title">{vocabulary?.name}</h1>
      <div className="vocabulary__left">
        <ScrollableWithHeader
          headerElement={(<CardForm onSubmit={handleAddCard} />)}
          contentElement={(
            <WordCardList
              cards={vocabulary?.cards!}
              onCardClick={selectCard}
              selectedCardId={selectedCardId}
            />
          )}
          headerClassName="vocabulary__cards-header"
          contentClassName="vocabulary__cards-content"
        />
      </div>
      <div className="vocabulary__right">
        {selectedCard
          ? <WordInfo card={selectedCard} />
          : <div>Слово не выбрано</div>
        }
      </div>
    </div>
  )
}

export default Vocabulary

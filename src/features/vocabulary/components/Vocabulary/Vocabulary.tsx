import React, { FC, useState } from 'react'
import { useAddCardMutation, useGetVocabularyQuery } from '../../../../store/api'
import { WordCard } from '../WordCard'
import './Vocabulary.css'
import { WordInfo } from '../WordInfo'
import { List } from '../../../../ui'
import { ICard } from '../../../../models'
import { CardForm } from '../CardForm'

// TODO: handle hardcore
const vocabularyId = '6371617f94613befa4ca49a2'

const Vocabulary: FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<string>('')

  const {
    isLoading,
    isError,
    data: vocabulary,
  } = useGetVocabularyQuery(vocabularyId)

  const [addCard] = useAddCardMutation()

  const selectedCard = vocabulary
    ? vocabulary.cards.find(card => card._id === selectedCardId)
    : null

  const selectCard = (cardId: string) => {
    setSelectedCardId(cardId)
  }

  // TODO: type data
  const handleAddCard = async (data: { wordName: string }) => {
    await addCard({ vocabularyId, ...data })
    alert('Добавлено')
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error occurred</div>

  return (
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
  )
}

export default Vocabulary

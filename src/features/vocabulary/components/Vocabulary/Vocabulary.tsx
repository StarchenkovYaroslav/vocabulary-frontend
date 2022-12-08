import React, { FC, useState } from 'react'
import { useGetVocabularyQuery } from '../../../../store/api'
import { WordCard } from '../WordCard'
import './Vocabulary.css'
import { WordInfo } from '../WordInfo'
import { List } from '../../../../ui'
import { ICard } from '../../../../models'

const Vocabulary: FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<string>('')

  const {
    isLoading,
    isError,
    data: vocabulary,
  } = useGetVocabularyQuery('6371617f94613befa4ca49a2')

  const selectedCard = vocabulary
    ? vocabulary.cards.find(card => card._id === selectedCardId)
    : null

  const selectCard = (cardId: string) => {
    setSelectedCardId(cardId)
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error occurred</div>

  return (
    <div className="vocabulary">
      <h1 className="vocabulary__title">{vocabulary?.name}</h1>
      <div className="vocabulary__card-list">
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
          itemClassName="vocabulary__card-item"
        />
      </div>
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

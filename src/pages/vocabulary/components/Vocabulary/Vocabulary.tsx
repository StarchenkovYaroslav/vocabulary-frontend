import React, { FC, useState } from 'react'
import { useGetVocabularyQuery } from '../../../../store/api'
import { WordCardsPanel } from '../WordCardsPanel'
import { WordInfoPanel } from '../WordInfoPanel'
import './Vocabulary.css'

// TODO: handle hardcore
const vocabularyId = '63dc79c493379531dcd026e5'

const Vocabulary: FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<string>('')

  const {
    isLoading: isVocabularyLoading,
    isError: isVocabularyError,
    data: vocabulary,
  } = useGetVocabularyQuery(vocabularyId)

  const selectedCard = vocabulary && selectedCardId
    ? vocabulary.cards.find(card => card._id === selectedCardId)
    : null

  const selectCard = (cardId: string) => setSelectedCardId(cardId)

  if (isVocabularyLoading) return <div>Loading...</div>
  if (isVocabularyError || !vocabulary) return <div>Error occurred</div>

  return (
    <div className="vocabulary">
      <h1 className="vocabulary__title">{vocabulary.name}</h1>
      <div className="vocabulary__word-cards-panel">
        <WordCardsPanel
          cards={vocabulary.cards}
          selectedCardId={selectedCardId}
          vocabularyId={vocabulary._id}
          onCardClick={selectCard}
        />
      </div>
      <div className="vocabulary__word-info-panel">
        {selectedCard
          ? <WordInfoPanel card={selectedCard} />
          : <div>Слово не выбрано</div>
        }
      </div>
    </div>
  )
}

export default Vocabulary

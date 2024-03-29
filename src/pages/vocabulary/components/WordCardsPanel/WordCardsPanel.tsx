import React, { FC, useState } from 'react'
import { ICard } from '../../../../models'
import { CardForm } from '../CardForm'
import { WordCardList } from '../WordCardList'
import { ScrollableWithHeader } from '../../../../ui'
import { filterWordCards } from '../../helpers'
import './WordCardsPanel.css'

interface Props {
  cards: ICard[]
  selectedCardId: string
  vocabularyId: string
  onCardClick: (cardId: string) => void
}

const WordCardsPanel: FC<Props> = ({
  cards,
  selectedCardId,
  vocabularyId,
  onCardClick,
}) => {
  const [searchRequest, setSearchRequest] = useState<string>('')

  const filteredCards = !searchRequest ? cards : filterWordCards(cards, searchRequest)

  const onSearchCard = (inputValue: string) => setSearchRequest(inputValue)

  return (
    <ScrollableWithHeader
      headerElement={
        <CardForm vocabularyId={vocabularyId} onSearchCard={onSearchCard} />
      }
      contentElement={
        <WordCardList
          cards={filteredCards}
          onCardClick={onCardClick}
          selectedCardId={selectedCardId}
        />
      }
      headerClassName="cards-header"
      contentClassName="cards-content"
    />
  )
}

export default WordCardsPanel

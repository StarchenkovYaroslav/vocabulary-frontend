import React, { FC } from 'react'
import { CardForm } from '../CardForm'
import { WordCardList } from '../WordCardList'
import { ScrollableWithHeader } from '../../../../ui'
import { ICard } from '../../../../models'
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
  return (
    <ScrollableWithHeader
      headerElement={(<CardForm vocabularyId={vocabularyId} />)}
      contentElement={(
        <WordCardList
          cards={cards}
          onCardClick={onCardClick}
          selectedCardId={selectedCardId}
        />
      )}
      headerClassName="cards-header"
      contentClassName="cards-content"
    />
  )
}

export default WordCardsPanel

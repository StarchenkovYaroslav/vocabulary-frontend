import React, { FC, useState } from 'react'
import { CardForm } from '../CardForm'
import { WordCardList } from '../WordCardList'
import { ScrollableWithHeader } from '../../../../ui'
import { ICard } from '../../../../models'
import { useAddCardMutation } from '../../../../store/api'
import { useFollowSeverStatus } from '../../../../hooks'
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
  const [addCard, { status: addingCardStatus }] = useAddCardMutation()

  // TODO: type data
  const handleAddCard = async (data: { wordName: string }) => {
    await addCard({ vocabularyId, ...data })
  }

  useFollowSeverStatus({ status: addingCardStatus })

  return (
    <ScrollableWithHeader
      headerElement={(<CardForm onSubmit={handleAddCard} />)}
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

import React, { FC } from 'react'
import { CardForm, CardFormValues } from '../CardForm'
import { WordCardList } from '../WordCardList'
import { ScrollableWithHeader } from '../../../../ui'
import { ICard } from '../../../../models'
import { useAddCardMutation } from '../../../../store/api'
import { useFollowServerStatus } from '../../../../hooks'
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

  useFollowServerStatus({ status: addingCardStatus })

  const handleAddCard = async (args: CardFormValues) => {
    await addCard({ ...args, vocabularyId })
  }

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

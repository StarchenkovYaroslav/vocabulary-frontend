import React, { FC } from 'react'
import { ICard } from '../../../../models'
import { WordCard } from '../WordCard'
import { List } from '../../../../ui'
import './WordCardList.css'

interface Props {
  cards: ICard[]
  onCardClick: (cardId: string) => void
  selectedCardId: string
}

const WordCardList: FC<Props> = ({
  cards,
  onCardClick,
  selectedCardId,
}) => {
  if (!cards.length) return <div>Список слов пуст</div>

  return (
    <List<ICard>
      data={cards}
      getItemKey={card => card._id}
      renderItem={card => (
        <WordCard
          card={card}
          isSelected={card._id === selectedCardId}
          onClick={onCardClick}
        />
      )}
      itemClassName="card-item"
    />
  )
}

export default WordCardList

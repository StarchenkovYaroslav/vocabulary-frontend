import React, { FC } from 'react'
import { ICard } from '../../../../models'
import './WordCard.css'

interface Props {
  card: ICard
  isSelected: boolean
  onClick: (cardId: string) => void
}

const WordCard: FC<Props> = ({ card, isSelected, onClick }) => {
  let cardClassName = 'card'
  if (isSelected) cardClassName += ' card_selected'

  const handleClick = () => {
    onClick(card._id)
  }

  return (
    <div className={cardClassName} onClick={handleClick}>
      <div className="card__title">{card.word.name}</div>
      <div className="card__description">{`${card.meanings.length} знач.`}</div>
    </div>
)
}

export default WordCard

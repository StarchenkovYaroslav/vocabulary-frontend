import React, { FC } from 'react'
import { ICard } from '../../../../models'
import { useRemoveCardMutation } from '../../../../store/api'
import { DeleteButton } from '../../../../ui'
import './WordCard.css'
import { useFollowSeverStatus } from '../../../../hooks'

interface Props {
  card: ICard
  isSelected: boolean
  onClick: (cardId: string) => void
}

const WordCard: FC<Props> =({
 card,
 isSelected,
 onClick,
}) => {
  const [
    removeCard,
    {
      isLoading: isCardRemoving,
      status: cardRemovingStatus,
    }
  ] = useRemoveCardMutation()

  let cardClassName = 'card'
  if (isSelected) cardClassName += ' card_selected'

  const handleClick = () => onClick(card._id)

  const handleDelete = () => removeCard(card._id)

  useFollowSeverStatus({ status: cardRemovingStatus })

  return (
    <div
      className={cardClassName}
      onClick={handleClick}
    >
      <DeleteButton
        isDeleting={isCardRemoving}
        onDelete={handleDelete}
        buttonClassName="card__delete-button"
        popConfirmTitle="Удалить слово из словаря?"
        popConfirmPlacement="right"
        iconSize={16}
      />
      <div className="card__title">{card.word.name}</div>
      <div className="card__description">{`${card.meanings.length} знач.`}</div>
    </div>
  )
}

export default WordCard

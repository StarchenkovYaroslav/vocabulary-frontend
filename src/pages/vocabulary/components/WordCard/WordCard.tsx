import React, { FC } from 'react'
import { ICard } from '../../../../models'
import { useRemoveCardMutation } from '../../../../store/api'
import { DeleteButton } from '../../../../ui'
import { useFollowServerStatus } from '../../../../hooks'
import './WordCard.css'

interface Props {
  card: ICard
  isSelected: boolean
  onClick: (cardId: string) => void
  searchRequest: string
}

const WordCard: FC<Props> =({
  card,
  isSelected,
  onClick,
  searchRequest,
}) => {
  const [
    removeCard,
    {
      isLoading: isCardRemoving,
      status: cardRemovingStatus,
    }
  ] = useRemoveCardMutation()

  useFollowServerStatus({ status: cardRemovingStatus })

  const handleClick = () => onClick(card._id)
  const handleDelete = () => removeCard(card._id)

  let cardClassName = 'card'
  if (isSelected) cardClassName += ' card_selected'

  let cardTitle = <div className="card__title">{card.word.name}</div>
  if (searchRequest) {
    console.log(card.word.name.match(new RegExp(`(.*?)(${searchRequest})(.*)`)))

    const matches = card.word.name.match(new RegExp(`(.*?)(${searchRequest})(.*)`))
    if (matches) {
      cardTitle = (
        <div className="card__title">{matches[1]}<span className="card__title_underlined">{matches[2]}</span>{matches[3]}</div>
      )
    }
  }

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
      {cardTitle}
      <div className="card__description">{`${card.meanings.length} знач.`}</div>
    </div>
  )
}

export default WordCard

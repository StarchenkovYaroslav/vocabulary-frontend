import React, { FC } from 'react'
import { IWordCard } from '../../models'
import { useRemoveCardMutation } from '../../../../store/api'
import { DeleteButton } from '../../../../ui'
import { useFollowServerStatus } from '../../../../hooks'
import { SplittedText } from '../SplittedText'
import './WordCard.css'

interface Props {
  card: IWordCard
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

  useFollowServerStatus({ status: cardRemovingStatus })

  const handleClick = () => onClick(card._id)
  const handleDelete = () => removeCard(card._id)

  let cardClassName = 'card'
  if (isSelected) cardClassName += ' card_selected'

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
      <div className="card__title">
        {card.searchResults && card.searchResults.word
          ? <SplittedText text={card.searchResults.word} />
          : card.word.name
        }
      </div>
      {card.searchResults && card.searchResults.translation &&
        <div className="card__found-translation">
          <SplittedText text={card.searchResults.translation} />
        </div>
      }
      <div className="card__description">{`Всего ${card.meanings.length} знач.`}</div>
    </div>
  )
}

export default WordCard

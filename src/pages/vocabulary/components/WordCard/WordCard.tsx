import React, { FC } from 'react'
import { IWordCard } from '../../models'
import { useRemoveCardMutation } from '../../../../store/api'
import { DeleteButton } from '../../../../ui'
import { useFollowServerStatus } from '../../../../hooks'
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

  let cardTitleElement: JSX.Element
  if (card.searchResults && card.searchResults.word) {
    const { formerPlainText, underlinedText, latterPlainText } = card.searchResults.word
    cardTitleElement = <div className="card__title">{formerPlainText}<span className="underlined">{underlinedText}</span>{latterPlainText}</div>
  } else {
    cardTitleElement = <div className="card__title">{card.word.name}</div>
  }

  let cardTranslationElement: JSX.Element | null = null
  if (card.searchResults && card.searchResults.translation) {
    const { formerPlainText, underlinedText, latterPlainText } = card.searchResults.translation
    cardTranslationElement = <div className="card__found-translation">{formerPlainText}<span className="underlined">{underlinedText}</span>{latterPlainText}</div>
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
      {cardTitleElement}
      {cardTranslationElement}
      <div className="card__description">{`Всего ${card.meanings.length} знач.`}</div>
    </div>
  )
}

export default WordCard

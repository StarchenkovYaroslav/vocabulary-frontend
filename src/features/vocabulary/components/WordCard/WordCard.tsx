import React, { FC, useEffect } from 'react'
import { ICard } from '../../../../models'
import { useRemoveCardMutation } from '../../../../store/api'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { DeleteButton } from '../DeleteButton'
import './WordCard.css'
import { useTypedSelector } from '../../../../hooks'

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
  const [removeCard, { isLoading, status }] = useRemoveCardMutation()

  const { message } = useTypedSelector(state => state.message)

  let cardClassName = 'card'
  if (isSelected) cardClassName += ' card_selected'

  const handleClick = () => onClick(card._id)

  const handleDelete = () => removeCard(card._id)

  useEffect(() => {
    if (status === QueryStatus.fulfilled) message?.success('Удалено')
    if (status === QueryStatus.rejected) message?.error('Ошибка')
  }, [status])

  return (
    <div
      className={cardClassName}
      onClick={handleClick}
    >
      <DeleteButton
        isDeleting={isLoading}
        onDelete={handleDelete}
        buttonClassName="card__delete-button"
        popConfirmTitle="Удалить слово из словаря?"
        popConfirmPlacement="right"
        size={16}
      />
      <div className="card__title">{card.word.name}</div>
      <div className="card__description">{`${card.meanings.length} знач.`}</div>
    </div>
  )
}

export default WordCard

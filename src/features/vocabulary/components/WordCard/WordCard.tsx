import React, { FC, useEffect } from 'react'
import { Button, Popconfirm, message } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'
import { ICard } from '../../../../models'
import './WordCard.css'
import { useRemoveCardMutation } from '../../../../store/api'
import { QueryStatus } from '@reduxjs/toolkit/query'

interface Props {
  card: ICard
  isSelected: boolean
  onClick: (cardId: string) => void
}

const WordCard: FC<Props> = ({ card, isSelected, onClick }) => {
  const [removeCard, { isLoading, status }] = useRemoveCardMutation()
  const [messageApi, contextHolder] = message.useMessage();

  let cardClassName = 'card'
  if (isSelected) cardClassName += ' card_selected'

  const handleClick = () => onClick(card._id)

  const handleDeleteClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.stopPropagation()
  }

  const handleDeleteCancel = (evt?: React.MouseEvent<HTMLElement>) => {
    evt!.stopPropagation()
  }

  const handleDeleteConfirm = (evt?: React.MouseEvent<HTMLElement>) => {
    evt!.stopPropagation()
    removeCard(card._id)
  }

  const showSuccessMessage = () => {
    messageApi.info('Удалено')
  }

  const showErrorMessage = () => {
    messageApi.error('Ошибка')
  }

  useEffect(() => {
    if (status === QueryStatus.fulfilled) showSuccessMessage()
    if (status === QueryStatus.rejected) showErrorMessage()
  }, [status])

  return (
    <>
      {contextHolder}

      <div
        className={cardClassName}
        onClick={handleClick}

      >
        <Popconfirm
          title="Удалить?"
          cancelText="Нет"
          okText="Да"
          placement="right"

          disabled={isLoading}
          cancelButtonProps={{
            disabled: isLoading,
          }}
          okButtonProps={{
            disabled: isLoading,
          }}
          onCancel={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        >
          <Button
            className="card__delete-button"
            htmlType="button"
            icon={
              <DeleteTwoTone
                twoToneColor="red"
                style={{ fontSize: '16px' }}
              />
            }

            onClick={handleDeleteClick}
            loading={isLoading}
          />
        </Popconfirm>
        <div className="card__title">{card.word.name}</div>
        <div className="card__description">{`${card.meanings.length} знач.`}</div>
      </div>
    </>
)
}

export default WordCard

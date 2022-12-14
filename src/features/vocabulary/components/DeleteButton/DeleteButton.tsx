import React, { FC } from 'react'
import { DeleteTwoTone } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
import { ButtonProps } from 'antd/es/button/button'
import { PopconfirmProps } from 'antd/es/popconfirm'
import './DeleteButton.css'

interface Props {
  buttonClassName?: ButtonProps['className']
  popConfirmTitle: PopconfirmProps['title']
  popConfirmPlacement: PopconfirmProps['placement']
  isDeleting: boolean,
  onDelete: () => void
}

const DeleteButton: FC<Props> = ({
  buttonClassName,
  popConfirmTitle,
  popConfirmPlacement,
  isDeleting,
  onDelete,
}) => {
  let finalClassName = 'delete-button'
  if (buttonClassName) finalClassName += ` ${buttonClassName}`

  const handleDeleteClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.stopPropagation()
  }

  const handleDeleteCancel = (evt?: React.MouseEvent<HTMLElement>) => {
    evt!.stopPropagation()
  }

  const handleDeleteConfirm = (evt?: React.MouseEvent<HTMLElement>) => {
    evt!.stopPropagation()
    onDelete()
  }

  return (
    <Popconfirm
      title={popConfirmTitle}
      placement={popConfirmPlacement}
      cancelText="Нет"
      okText="Да"

      disabled={isDeleting}
      cancelButtonProps={{
        disabled: isDeleting,
      }}
      okButtonProps={{
        disabled: isDeleting,
      }}
      onCancel={handleDeleteCancel}
      onConfirm={handleDeleteConfirm}
    >
      <Button
        className={finalClassName}
        htmlType="button"
        icon={
          <DeleteTwoTone
            twoToneColor="red"
            style={{ fontSize: '16px' }}
          />
        }
        loading={isDeleting}
        onClick={handleDeleteClick}
      />
    </Popconfirm>
  )
}

export default DeleteButton
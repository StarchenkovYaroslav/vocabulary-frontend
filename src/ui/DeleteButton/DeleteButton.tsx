import React, { FC } from 'react'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
import { ButtonProps } from 'antd/es/button/button'
import { PopconfirmProps } from 'antd/es/popconfirm'
import './DeleteButton.css'

interface Props {
  buttonClassName?: ButtonProps['className']
  popConfirmTitle: PopconfirmProps['title']
  popConfirmPlacement: PopconfirmProps['placement']
  isDeleting: boolean,
  onDelete: () => void,
  iconSize?: number | string
}

const DeleteButton: FC<Props> = ({
  buttonClassName,
  popConfirmTitle,
  popConfirmPlacement,
  isDeleting,
  onDelete,
  iconSize,
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
        shape="default"
        type="ghost"
        icon={
          <DeleteOutlined
            style={{ fontSize: iconSize || 14 }}
          />
        }
        loading={isDeleting}
        onClick={handleDeleteClick}
      />
    </Popconfirm>
  )
}

export default DeleteButton

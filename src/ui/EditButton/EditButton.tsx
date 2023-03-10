import React, { FC } from 'react'
import { EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ButtonProps } from 'antd/es/button/button'
import './EditButton.css'

interface Props {
  onEdit: () => void,
  iconSize?: number | string
  className?: ButtonProps['className']
}

const EditButton: FC<Props> = ({ onEdit, iconSize, className }) => {
  let finalClassName = 'edit-button'
  if (className) finalClassName += ` ${className}`

  return (
    <Button
      htmlType="button"
      onClick={onEdit}
      shape="default"
      type="ghost"
      icon={
        <EditOutlined
          style={{ fontSize: iconSize || 14 }}
        />
      }
      className={finalClassName}
    />
  )
}

export default EditButton

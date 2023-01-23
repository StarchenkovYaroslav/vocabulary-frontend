import React, { FC } from 'react'
import { ButtonProps } from 'antd/es/button/button'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import './AddButton.css'

interface Props {
  onAdd: () => void,
  iconSize?: number | string
  className?: ButtonProps['className']
}

const AddButton: FC<Props> = ({ onAdd, iconSize, className }) => {
  let finalClassName = 'add-button'
  if (className) finalClassName += ` ${className}`

  return (
    <Button
      htmlType="button"
      onClick={onAdd}
      shape="default"
      type="ghost"
      icon={
        <PlusCircleOutlined
          style={{ fontSize: iconSize || 14 }}
        />
      }
      className={finalClassName}
    />
  )
}

export default AddButton

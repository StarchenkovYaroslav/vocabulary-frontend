import React, { FC, useState } from 'react'
import { PopconfirmProps } from 'antd/es/popconfirm'
import { AddButton } from '../AddButton'
import { DeleteButton } from '../DeleteButton'
import './Manageable.css'

interface Props {
  headerElement: JSX.Element
  contentElement?: JSX.Element
  addFormElement?: JSX.Element
  deleteOptions?: {
    onDelete: () => void
    isDeleting: boolean
    popConfirmDeleteTitle: PopconfirmProps['title']
    popConfirmDeletePlacement: PopconfirmProps['placement']
  }
  headerClassName?: string
  contentClassName?: string
}

const Manageable: FC<Props> = ({
  headerElement,
  contentElement,
  addFormElement,
  deleteOptions,
  headerClassName,
  contentClassName,
}) => {
  const [isAddFormVisible, setIsAddFormVisible] = useState<boolean>(false)

  let headerFinalClassName = 'manageable__header'
  if (headerClassName) headerFinalClassName += ` ${headerClassName}`

  let contentFinalClassName = 'manageable__content'
  if (contentClassName) contentFinalClassName += ` ${contentClassName}`

  let addFormClassName = 'manageable__add-form'
  if (isAddFormVisible) addFormClassName += ' manageable__add-form_visible'

  const handleAddButton = () => setIsAddFormVisible(prevState => !prevState)

  return (
    <>
      <div className={headerFinalClassName}>
        {headerElement}
        {addFormElement && <AddButton onAdd={handleAddButton} />}
        {deleteOptions &&
          <DeleteButton
            popConfirmTitle={deleteOptions.popConfirmDeleteTitle}
            popConfirmPlacement={deleteOptions.popConfirmDeletePlacement}
            isDeleting={deleteOptions.isDeleting}
            onDelete={deleteOptions.onDelete}
          />
        }
      </div>
      {addFormElement &&
        <div className={addFormClassName}>
          {addFormElement}
        </div>
      }
      {contentElement &&
        <div className={contentFinalClassName}>
          {contentElement}
        </div>
      }
    </>
  )
}

export default Manageable

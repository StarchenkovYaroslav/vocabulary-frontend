import React, { FC, useState } from 'react'
import { Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { DeleteButton } from '../DeleteButton'
import { Translation } from '../Translation'
import { List } from '../../../../ui'
import { AddTranslationForm } from '../AddTranslationForm'
import { ITranslation } from '../../../../models/ITranslation'
import { IMeaning } from '../../../../models/IMeaning'
import { useAddTranslationMutation, useRemoveMeaningMutation } from '../../../../store/api'
import { useFollowSeverStatus } from '../../../../hooks'
import './Meaning.css'

interface Props {
  meaning: IMeaning
}

const Meaning: FC<Props> = ({
  meaning,
}) => {
  const [
    isAddTranslationFormVisible,
    setIsAddTranslationFormVisible
  ] = useState<boolean>(false)

  const [
    addTranslation,
    {
      status: translationAddingStatus,
    }
  ] = useAddTranslationMutation()

  const [
    removeMeaning,
    {
      isLoading: isMeaningDeleting,
      status: meaningDeletingStatus,
    }
  ] = useRemoveMeaningMutation()

  // TODO: type
  const handleAddTranslation = async (data: { translationName: string }) => {
    await addTranslation({ ...data, meaningId: meaning._id })
  }

  const handleRemoveMeaning = () => removeMeaning(meaning._id)

  const switchAddTranslationForm = () => {
    setIsAddTranslationFormVisible(prevState => !prevState)
  }

  useFollowSeverStatus({ status: meaningDeletingStatus })
  useFollowSeverStatus({ status: translationAddingStatus })

  return (
    <div className="word-info__meaning">
      <div className="word-info__meaning-title-container">
        <h3 className="word-info__meaning-title">{meaning.name}</h3>
        <Button
          htmlType="button"
          onClick={switchAddTranslationForm}
          shape="default"
          type="ghost"
          icon={
            <PlusCircleOutlined
              style={{ fontSize: '14px' }}
            />
          }
          className="word-info__add-meaning-button"
        />
        <DeleteButton
          isDeleting={isMeaningDeleting}
          onDelete={handleRemoveMeaning}
          popConfirmTitle="Удалить значение с переводами?"
          popConfirmPlacement="top"
        />
      </div>
      <AddTranslationForm
        onSubmit={handleAddTranslation}
        isVisible={isAddTranslationFormVisible}
      />
      <div className="word-info__translation-list">
        <List<ITranslation>
          data={meaning.translations}
          getItemKey={translation => translation._id}
          renderItem={translation => (
            <Translation
              translation={translation}
              meaningId={meaning._id}
            />
          )}
          itemClassName="word-info__translation-item"
        />
      </div>
    </div>
  )
}

export default Meaning

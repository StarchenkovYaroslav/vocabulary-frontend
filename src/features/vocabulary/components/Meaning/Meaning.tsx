import React, { FC, useState } from 'react'
import { Translation } from '../Translation'
import { List, DeleteButton, AddButton } from '../../../../ui'
import { AddTranslationForm } from '../AddTranslationForm'
import { TranslationList } from '../TranslationList'
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
        <AddButton onAdd={switchAddTranslationForm} />
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
      <TranslationList
        translations={meaning.translations}
        meaningId={meaning._id}
      />
    </div>
  )
}

export default Meaning

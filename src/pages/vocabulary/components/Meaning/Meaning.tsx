import React, { FC } from 'react'
import { Manageable } from '../../../../ui'
import { AddTranslationForm } from '../AddTranslationForm'
import { TranslationList } from '../TranslationList'
import { IMeaning } from '../../../../models/IMeaning'
import { useAddTranslationMutation, useRemoveMeaningMutation } from '../../../../store/api'
import { useFollowServerStatus } from '../../../../hooks'
import './Meaning.css'

interface Props {
  meaning: IMeaning
}

const Meaning: FC<Props> = ({
  meaning,
}) => {
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

  useFollowServerStatus({ status: meaningDeletingStatus })
  useFollowServerStatus({ status: translationAddingStatus })

  // TODO: type
  const handleAddTranslation = async (data: { translationName: string }) => {
    await addTranslation({ ...data, meaningId: meaning._id })
  }

  const handleRemoveMeaning = () => removeMeaning(meaning._id)

  return (
    <Manageable
      headerElement={<h3 className="meaning-title">{meaning.name}</h3>}
      contentElement={
        <TranslationList
          translations={meaning.translations}
          meaningId={meaning._id}
        />
      }
      addFormElement={<AddTranslationForm onSubmit={handleAddTranslation} />}
      deleteOptions={{
        onDelete: handleRemoveMeaning,
        isDeleting: isMeaningDeleting,
        popConfirmDeleteTitle: 'Удалить значение с переводами?',
        popConfirmDeletePlacement: 'top',
      }}
      headerClassName="meaning-header"
      contentClassName="meaning-content"
    />
  )
}

export default Meaning

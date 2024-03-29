import React, { FC } from 'react'
import { ITranslation } from '../../../../models/ITranslation'
import { Manageable } from '../../../../ui'
import { EditTranslationForm } from '../EditTranslationForm'
import { useRemoveTranslationMutation } from '../../../../store/api'
import { useFollowServerStatus } from '../../../../hooks'
import './Translation.css'

interface Props {
  translation: ITranslation
  meaningId: string
}

const Translation: FC<Props> = ({
  translation,
  meaningId,
}) => {
  const [
    removeTranslation,
    {
      isLoading: isTranslationDeleting,
      status: translationDeletingStatus,
    }
  ] = useRemoveTranslationMutation()

  useFollowServerStatus({ status: translationDeletingStatus })

  const handleRemoveTranslation = () => {
    removeTranslation({ meaningId: meaningId, translationId: translation._id })
  }

  return (
    <Manageable
      headerElement={<p className="translation-name">{translation.name}</p>}
      editFormElement={
        <EditTranslationForm
          meaningId={meaningId}
          translation={translation}
        />
      }
      deleteOptions={{
        onDelete: handleRemoveTranslation,
        isDeleting: isTranslationDeleting,
        popConfirmDeleteTitle: 'Удалить перевод?',
        popConfirmDeletePlacement: 'top',
      }}
      headerClassName="translation-header"
    />
  )
}

export default Translation

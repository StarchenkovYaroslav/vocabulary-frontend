import React, { FC, useEffect } from 'react'
import { ITranslation } from '../../../../models/ITranslation'
import './Translation.css'
import { DeleteButton } from '../DeleteButton'
import { useRemoveTranslationMutation } from '../../../../store/api'
import { QueryStatus } from '@reduxjs/toolkit/query'

interface Props {
  translation: ITranslation
  meaningId: string
  onShowSuccessMessage: (message: string) => void
  onShowErrorMessage: (message: string) => void
}

const Translation: FC<Props> = ({
  translation,
  meaningId,
  onShowSuccessMessage,
  onShowErrorMessage,
}) => {
  const [
    removeTranslation,
    {
      isLoading: isTranslationDeleting,
      status: translationDeletingStatus,
    }
  ] = useRemoveTranslationMutation()

  useEffect(() => {
    if (translationDeletingStatus === QueryStatus.fulfilled) onShowSuccessMessage('Удалено')
    if (translationDeletingStatus === QueryStatus.rejected) onShowErrorMessage('Ошибка')
  }, [translationDeletingStatus])

  const handleRemoveTranslation = () => {
    removeTranslation({meaningId: meaningId, translationId: translation._id })
  }

  return (
    <div className="word-info__translation">
      <p className="word-info__translation-name">{translation.name}</p>
      <DeleteButton
        popConfirmTitle="Удалить перевод?"
        popConfirmPlacement="top"
        isDeleting={isTranslationDeleting}
        onDelete={handleRemoveTranslation}
      />
    </div>
  )
}

export default Translation

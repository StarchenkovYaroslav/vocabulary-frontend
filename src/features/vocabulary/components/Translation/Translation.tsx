import React, { FC, useEffect } from 'react'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { ITranslation } from '../../../../models/ITranslation'
import { DeleteButton } from '../DeleteButton'
import { useRemoveTranslationMutation } from '../../../../store/api'
import { useTypedSelector } from '../../../../hooks'
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

  const { message } = useTypedSelector(state => state.message)

  useEffect(() => {
    if (translationDeletingStatus === QueryStatus.fulfilled) message?.success('Удалено')
    if (translationDeletingStatus === QueryStatus.rejected) message?.error('Ошибка')
  }, [translationDeletingStatus])

  const handleRemoveTranslation = () => {
    removeTranslation({ meaningId: meaningId, translationId: translation._id })
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

import React, { FC } from 'react'
import { ITranslation } from '../../../../models/ITranslation'
import { DeleteButton } from '../../../../ui'
import { useRemoveTranslationMutation } from '../../../../store/api'
import { useFollowSeverStatus } from '../../../../hooks'
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

  useFollowSeverStatus({ status: translationDeletingStatus })

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

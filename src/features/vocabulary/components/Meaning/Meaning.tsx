import React, { FC, useEffect } from 'react'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { DeleteButton } from '../DeleteButton'
import { List } from '../../../../ui'
import { ITranslation } from '../../../../models/ITranslation'
import { IMeaning } from '../../../../models/IMeaning'
import { useRemoveMeaningMutation } from '../../../../store/api'
import './Meaning.css'

interface Props {
  meaning: IMeaning
  onShowSuccessMessage: (message: string) => void
  onShowErrorMessage: (message: string) => void
}

const Meaning: FC<Props> = ({
  meaning,
  onShowSuccessMessage,
  onShowErrorMessage
}) => {
  const [
    removeMeaning,
    {
      isLoading: isMeaningDeleting,
      status: meaningDeletingStatus,
    }
  ] = useRemoveMeaningMutation()

  const handleRemoveMeaning = () => removeMeaning(meaning._id)

  useEffect(() => {
    if (meaningDeletingStatus === QueryStatus.fulfilled) onShowSuccessMessage('Удалено')
    if (meaningDeletingStatus === QueryStatus.rejected) onShowErrorMessage('Ошибка')
  }, [meaningDeletingStatus])

  return (
    <div className="word-info__meaning">
      <div className="word-info__meaning-title-container">
        <h3 className="word-info__meaning-title">{meaning.name}</h3>
        <DeleteButton
          isDeleting={isMeaningDeleting}
          onDelete={handleRemoveMeaning}
          popConfirmTitle="Удалить значение с переводами?"
          popConfirmPlacement="top"
        />
      </div>
      <div className="word-info__translation-list">
        <List<ITranslation>
          data={meaning.translations}
          getItemKey={translation => translation._id}
          renderItem={translation => (
            <div className="word-info__translation-name">{translation.name}</div>
          )}
          itemClassName="word-info__translation-item"
        />
      </div>
    </div>
  )
}

export default Meaning

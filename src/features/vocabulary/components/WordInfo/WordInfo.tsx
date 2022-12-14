import React, { FC, useEffect } from 'react'
import { ICard } from '../../../../models'
import { List } from '../../../../ui'
import { DeleteButton } from '../DeleteButton'
import { AddMeaningForm } from '../AddMeaningForm'
import { IMeaning } from '../../../../models/IMeaning'
import { ITranslation } from '../../../../models/ITranslation'
import { useCreateMeaningMutation, useRemoveMeaningMutation } from '../../../../store/api'
import './WordInfo.css'
import { QueryStatus } from '@reduxjs/toolkit/query'

interface Props {
  card: ICard
  onShowSuccessMessage: (message: string) => void
  onShowErrorMessage: (message: string) => void
}

const WordInfo: FC<Props> = ({ card, onShowErrorMessage, onShowSuccessMessage }) => {
  const [createMeaning, { status: meaningCreationStatus }] = useCreateMeaningMutation()

  // TODO: fix: move to MeaningComponent
  const [
    removeMeaning,
    {
      isLoading: isMeaningDeleting,
      status: meaningDeletingStatus,
    }
  ] = useRemoveMeaningMutation()

  // TODO: fix: move to MeaningComponent
  useEffect(() => {
    if (meaningDeletingStatus === QueryStatus.fulfilled) onShowSuccessMessage('Удалено')
    if (meaningDeletingStatus === QueryStatus.rejected) onShowErrorMessage('Ошибка')
  }, [meaningDeletingStatus])

  useEffect(() => {
    if (meaningCreationStatus === QueryStatus.fulfilled) onShowSuccessMessage('Добавлено')
    if (meaningCreationStatus === QueryStatus.rejected) onShowErrorMessage('Ошибка')
  }, [meaningCreationStatus])

  // TODO: type data
  const handleAddMeaning = async (data: { name: string }) => {
    await createMeaning({ ...data, cardId: card._id })
  }

  // TODO: fix: move to MeaningComponent
  const handleRemoveMeaning = (id: string) => {
    removeMeaning(id)
  }

  return (
    <div className="word-info">
      <h2 className="word-info__title">{card.word.name}</h2>
      <AddMeaningForm onSubmit={handleAddMeaning} />
      <List<IMeaning>
        data={card.meanings}
        getItemKey={meaning => meaning._id}
        renderItem={meaning => (
          <div className="word-info__meaning">
            <div className="word-info__meaning-title-container">
              <h3 className="word-info__meaning-title">{meaning.name}</h3>
              <DeleteButton
                isDeleting={isMeaningDeleting}
                onDelete={() => handleRemoveMeaning(meaning._id)}
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
        )}
      />
    </div>
  )
}

export default WordInfo

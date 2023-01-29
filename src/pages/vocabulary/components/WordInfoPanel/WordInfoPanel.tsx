import React, { FC } from 'react'
import { ICard } from '../../../../models'
import { ScrollableWithHeader } from '../../../../ui'
import { AddMeaningForm } from '../AddMeaningForm'
import { MeaningList } from '../MeaningList'
import { useCreateMeaningMutation } from '../../../../store/api'
import { useFollowServerStatus } from '../../../../hooks'
import './WordInfoPanel.css'

interface Props {
  card: ICard
}

const WordInfoPanel: FC<Props> = ({ card }) => {
  const [createMeaning, { status: meaningCreationStatus }] = useCreateMeaningMutation()

  useFollowServerStatus({ status: meaningCreationStatus })

  // TODO: type data
  const handleAddMeaning = async (data: { name: string }) => {
    await createMeaning({ ...data, cardId: card._id })
  }

  return (
    <ScrollableWithHeader
      headerElement={(
        <>
          <h2 className="word-info__title">{card.word.name}</h2>
          <AddMeaningForm onSubmit={handleAddMeaning} />
        </>
      )}
      contentElement={<MeaningList meanings={card.meanings} />}
      headerClassName="word-info__header"
      contentClassName="word-info__content"
    />
  )
}

export default WordInfoPanel

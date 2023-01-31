import React, { FC } from 'react'
import { ICard } from '../../../../models'
import { ScrollableWithHeader } from '../../../../ui'
import { AddMeaningForm, AddMeaningFormValues } from '../AddMeaningForm'
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

  const handleAddMeaning = async (args: AddMeaningFormValues) => {
    await createMeaning({ ...args, cardId: card._id })
  }

  return (
    <ScrollableWithHeader
      headerElement={(
        <>
          <h2 className="word-title">{card.word.name}</h2>
          <AddMeaningForm onSubmit={handleAddMeaning} />
        </>
      )}
      contentElement={<MeaningList meanings={card.meanings} />}
      headerClassName="word-header"
      contentClassName="word-content"
    />
  )
}

export default WordInfoPanel

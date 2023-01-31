import React, { FC } from 'react'
import { AddMeaningForm, AddMeaningFormValues } from '../AddMeaningForm'
import { Manageable } from '../../../../ui'
import { ICard } from '../../../../models'
import { useCreateMeaningMutation } from '../../../../store/api'
import { useFollowServerStatus } from '../../../../hooks'
import './WordInfoPanelHeader.css'

interface Props {
  card: ICard
}

const WordInfoPanelHeader: FC<Props> = ({ card }) => {
  const [createMeaning, { status: meaningCreationStatus }] = useCreateMeaningMutation()

  useFollowServerStatus({ status: meaningCreationStatus })

  const handleAddMeaning = async (args: AddMeaningFormValues) => {
    await createMeaning({ ...args, cardId: card._id })
  }

  return (
    <Manageable
      headerElement={<h2 className="word-title">{card.word.name}</h2>}
      addFormElement={<AddMeaningForm onSubmit={handleAddMeaning} />}
      headerClassName="word-title-header"
    />
  )
}

export default WordInfoPanelHeader

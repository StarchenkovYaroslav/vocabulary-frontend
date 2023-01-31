import React, { FC } from 'react'
import { AddMeaningForm, AddMeaningFormValues } from '../AddMeaningForm'
import { Manageable } from '../../../../ui'
import { ICard } from '../../../../models'
import { useAddMeaningMutation } from '../../../../store/api'
import { useFollowServerStatus } from '../../../../hooks'
import './WordInfoPanelHeader.css'

interface Props {
  card: ICard
}

const WordInfoPanelHeader: FC<Props> = ({ card }) => {
  const [addMeaning, { status: meaningAddingStatus }] = useAddMeaningMutation()

  useFollowServerStatus({ status: meaningAddingStatus })

  const handleAddMeaning = async (args: AddMeaningFormValues) => {
    await addMeaning({ ...args, cardId: card._id })
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

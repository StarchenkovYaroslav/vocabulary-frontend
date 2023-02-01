import React, { FC } from 'react'
import { AddMeaningForm } from '../AddMeaningForm'
import { Manageable } from '../../../../ui'
import { ICard } from '../../../../models'
import './WordInfoPanelHeader.css'

interface Props {
  card: ICard
}

const WordInfoPanelHeader: FC<Props> = ({ card }) => {
  return (
    <Manageable
      headerElement={<h2 className="word-title">{card.word.name}</h2>}
      addFormElement={<AddMeaningForm cardId={card._id} />}
      headerClassName="word-title-header"
    />
  )
}

export default WordInfoPanelHeader

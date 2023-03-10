import React, { FC } from 'react'
import { AddMeaningForm } from '../AddMeaningForm'
import { Manageable } from '../../../../ui'
import { ICard } from '../../../../models'
import { EditWordForm } from '../EditWordForm'
import './WordInfoPanelHeader.css'

interface Props {
  card: ICard
}

const WordInfoPanelHeader: FC<Props> = ({ card }) => {
  return (
    <Manageable
      headerElement={<h2 className="word-title">{card.word.name}</h2>}
      addFormElement={<AddMeaningForm cardId={card._id} />}
      editFormElement={<EditWordForm cardId={card._id} word={card.word} />}
      headerClassName="word-title-header"
    />
  )
}

export default WordInfoPanelHeader

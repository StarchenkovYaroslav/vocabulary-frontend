import React, { FC } from 'react'
import { ICard } from '../../../../models'
import { ScrollableWithHeader } from '../../../../ui'
import { MeaningList } from '../MeaningList'
import './WordInfoPanel.css'
import { WordInfoPanelHeader } from '../WordInfoPanelHeader'

interface Props {
  card: ICard
}

const WordInfoPanel: FC<Props> = ({ card }) => {
  return (
    <ScrollableWithHeader
      headerElement={<WordInfoPanelHeader card={card} />}
      contentElement={<MeaningList meanings={card.meanings} />}
      headerClassName="word-header"
      contentClassName="word-content"
    />
  )
}

export default WordInfoPanel

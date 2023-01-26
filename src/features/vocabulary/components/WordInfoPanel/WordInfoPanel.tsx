import React, { FC } from 'react'
import { ICard } from '../../../../models'
import { WordInfo } from '../WordInfo'

interface Props {
  card: ICard | null | undefined
}

const WordInfoPanel: FC<Props> = ({ card }) => {
  if (!card) return <div>Слово не выбрано</div>
  return <WordInfo card={card} />
}

export default WordInfoPanel

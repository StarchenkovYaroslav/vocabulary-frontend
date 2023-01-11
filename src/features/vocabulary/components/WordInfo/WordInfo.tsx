import React, { FC, useEffect, useState } from 'react'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { ICard } from '../../../../models'
import { IMeaning } from '../../../../models/IMeaning'
import { List } from '../../../../ui'
import { AddMeaningForm } from '../AddMeaningForm'
import { Meaning } from '../Meaning'
import { useCreateMeaningMutation } from '../../../../store/api'
import './WordInfo.css'

interface Props {
  card: ICard
  onShowSuccessMessage: (message: string) => void
  onShowErrorMessage: (message: string) => void
}

const WordInfo: FC<Props> = ({ card, onShowErrorMessage, onShowSuccessMessage }) => {
  const [createMeaning, { status: meaningCreationStatus }] = useCreateMeaningMutation()

  const [areMeaningsScrolled, setAreMeaningsScrolled] = useState<boolean>(false)

  useEffect(() => {
    if (meaningCreationStatus === QueryStatus.fulfilled) onShowSuccessMessage('Добавлено')
    if (meaningCreationStatus === QueryStatus.rejected) onShowErrorMessage('Ошибка')
  }, [meaningCreationStatus])

  // TODO: type data
  const handleAddMeaning = async (data: { name: string }) => {
    await createMeaning({ ...data, cardId: card._id })
  }

  const handleMeaningsScroll = (evt: React.UIEvent<HTMLUListElement>) => {
    if (evt.currentTarget.scrollTop > 0) setAreMeaningsScrolled(true)
    else setAreMeaningsScrolled(false)
  }

  let wordHeaderClassName = 'word-info__header'
  if (areMeaningsScrolled) wordHeaderClassName += ' word-info__header_bordered'

  return (
    <div className="word-info">
      <div className={wordHeaderClassName}>
        <h2 className="word-info__title">{card.word.name}</h2>
        <AddMeaningForm onSubmit={handleAddMeaning} />
      </div>
      <List<IMeaning>
        data={card.meanings}
        onScroll={handleMeaningsScroll}
        getItemKey={meaning => meaning._id}
        renderItem={meaning => (
          <Meaning
            meaning={meaning}
            onShowSuccessMessage={onShowSuccessMessage}
            onShowErrorMessage={onShowErrorMessage}
          />
        )}
        listClassName="word-info__meanings"
      />
    </div>
  )
}

export default WordInfo

import React, { FC, useEffect, useState } from 'react'
import { QueryStatus } from '@reduxjs/toolkit/query'
import { ICard } from '../../../../models'
import { IMeaning } from '../../../../models/IMeaning'
import { List } from '../../../../ui'
import { AddMeaningForm } from '../AddMeaningForm'
import { Meaning } from '../Meaning'
import { useCreateMeaningMutation } from '../../../../store/api'
import './WordInfo.css'
import { useTypedSelector } from '../../../../hooks'

interface Props {
  card: ICard
}

const WordInfo: FC<Props> = ({ card }) => {
  const [areMeaningsScrolled, setAreMeaningsScrolled] = useState<boolean>(false)

  const { message } = useTypedSelector(state => state.message)

  const [createMeaning, { status: meaningCreationStatus }] = useCreateMeaningMutation()

  useEffect(() => {
    if (meaningCreationStatus === QueryStatus.fulfilled) message?.success('Добавлено')
    if (meaningCreationStatus === QueryStatus.rejected) message?.error('Ошибка')
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
          <Meaning meaning={meaning} />
        )}
        listClassName="word-info__meanings"
      />
    </div>
  )
}

export default WordInfo

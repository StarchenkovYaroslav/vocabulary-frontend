import React, { FC } from 'react'
import { ICard } from '../../../../models'
import { IMeaning } from '../../../../models/IMeaning'
import { List, ScrollableWithHeader } from '../../../../ui'
import { AddMeaningForm } from '../AddMeaningForm'
import { Meaning } from '../Meaning'
import { useCreateMeaningMutation } from '../../../../store/api'
import { useFollowSeverStatus } from '../../../../hooks'
import './WordInfo.css'

interface Props {
  card: ICard
}

const WordInfo: FC<Props> = ({ card }) => {
  const [createMeaning, { status: meaningCreationStatus }] = useCreateMeaningMutation()

  useFollowSeverStatus({ status: meaningCreationStatus })

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
      contentElement={(
        <List<IMeaning>
          data={card.meanings}
          getItemKey={meaning => meaning._id}
          renderItem={meaning => (
            <Meaning meaning={meaning} />
          )}
        />
      )}
      headerClassName="word-info__header"
      contentClassName="word-info__content"
    />
  )
}

export default WordInfo

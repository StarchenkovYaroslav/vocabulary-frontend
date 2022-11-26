import React, { FC } from 'react'
import { useGetVocabularyQuery } from '../../../../store/api'

const Vocabulary: FC = () => {
  const { isLoading, data: vocabulary } = useGetVocabularyQuery('6371617f94613befa4ca49a2')

  if (isLoading) return <div>Loading...</div>

  return (
    <div>{JSON.stringify(vocabulary)}</div>
  )

  // return (
  //   <div>
  //     {vocabulary.name}
  //     {vocabulary.cards.map((card: any) => (
  //       <div style={{
  //         border: '1px solid black',
  //         margin: '0 0 8px',
  //       }}>
  //         {card.word.name}
  //       </div>
  //     ))}
  //   </div>
  // )
}

export default Vocabulary

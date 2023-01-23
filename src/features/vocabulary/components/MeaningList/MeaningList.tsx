import React, { FC } from 'react'
import { IMeaning } from '../../../../models/IMeaning'
import { Meaning } from '../Meaning'
import { List } from '../../../../ui'

interface Props {
  meanings: IMeaning[]
}

const MeaningList: FC<Props> = ({ meanings }) => {
  return (
    <List<IMeaning>
      data={meanings}
      getItemKey={meaning => meaning._id}
      renderItem={meaning => (
        <Meaning meaning={meaning} />
      )}
    />
  )
}

export default MeaningList

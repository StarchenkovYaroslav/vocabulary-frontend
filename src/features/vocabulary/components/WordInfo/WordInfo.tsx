import React, { FC } from 'react'
import { ICard } from '../../../../models'
import { List } from '../../../../ui'
import { IMeaning } from '../../../../models/IMeaning'
import { ITranslation } from '../../../../models/ITranslation'
import './WordInfo.css'

interface Props {
  card: ICard
}

const WordInfo: FC<Props> = ({ card }) => {
  return (
    <div className="word-info">
      <h2 className="word-info__title">{card.word.name}</h2>
      <List<IMeaning>
        data={card.meanings}
        getItemKey={meaning => meaning._id}
        renderItem={meaning => (
          <div className="word-info__meaning">
            <h3 className="word-info__meaning-title">{meaning.name}</h3>
            <div className="word-info__translation-list">
              <List<ITranslation>
                data={meaning.translations}
                getItemKey={translation => translation._id}
                renderItem={translation => (
                  <div className="word-info__translation-name">{translation.name}</div>
                )}
                itemClassName="word-info__translation-item"
              />
            </div>
          </div>
        )}
      />
    </div>
  )
}

export default WordInfo

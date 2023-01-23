import React, { FC } from 'react'
import { ITranslation } from '../../../../models/ITranslation'
import { Translation } from '../Translation'
import { List } from '../../../../ui'
import './TranslationList.css'

interface Props {
  translations: ITranslation[]
  meaningId: string
}

const TranslationList: FC<Props> = ({ translations, meaningId }) => {
  return (
    <List<ITranslation>
      data={translations}
      getItemKey={translation => translation._id}
      renderItem={translation => (
        <Translation
          translation={translation}
          meaningId={meaningId}
        />
      )}
      listClassName="translation-list"
      itemClassName="translation-item"
    />
  )
}

export default TranslationList

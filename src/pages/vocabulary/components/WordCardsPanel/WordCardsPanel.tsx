import React, { FC, useState } from 'react'
import { ICard } from '../../../../models'
import { ITranslation } from '../../../../models/ITranslation'
import { IWordCard } from '../../Models'
import { CardForm } from '../CardForm'
import { WordCardList } from '../WordCardList'
import { ScrollableWithHeader } from '../../../../ui'
import './WordCardsPanel.css'

interface Props {
  cards: ICard[]
  selectedCardId: string
  vocabularyId: string
  onCardClick: (cardId: string) => void
}

const WordCardsPanel: FC<Props> = ({
  cards,
  selectedCardId,
  vocabularyId,
  onCardClick,
}) => {
  const [searchRequest, setSearchRequest] = useState<string>('')

  const searchRegExp = new RegExp(`(.*?)(${searchRequest})(.*)`, 'i')

  const filteredCards = !searchRequest
    ? cards
    : cards.reduce<IWordCard[]>((filteredCards, card) => {
      const isWordMatched = searchRegExp.test(card.word.name)

      const foundTranslation = card.meanings
        .reduce<ITranslation[]>((translations, meaning) => [...translations, ...meaning.translations], [])
        .find(translation => searchRegExp.test(translation.name))

      if (!isWordMatched && !foundTranslation) return filteredCards

      const wordCard = {
        ...card,
        searchResults: {
          word: isWordMatched ? card.word.name.match(searchRegExp) : null,
          translation: foundTranslation ? foundTranslation.name.match(searchRegExp) : null,
        }
    }

    return [...filteredCards, wordCard]
  }, [])

  const onSearchCard = (inputValue: string) => setSearchRequest(inputValue)

  return (
    <ScrollableWithHeader
      headerElement={
        <CardForm vocabularyId={vocabularyId} onSearchCard={onSearchCard} />
      }
      contentElement={
        <WordCardList
          cards={filteredCards}
          onCardClick={onCardClick}
          selectedCardId={selectedCardId}
        />
      }
      headerClassName="cards-header"
      contentClassName="cards-content"
    />
  )
}

export default WordCardsPanel

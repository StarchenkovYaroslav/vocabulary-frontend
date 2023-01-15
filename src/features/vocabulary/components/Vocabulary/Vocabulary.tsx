import React, { FC, useState } from 'react'
import { useAddCardMutation, useGetVocabularyQuery } from '../../../../store/api'
import { List } from '../../../../ui'
import { WordCard } from '../WordCard'
import { WordInfo } from '../WordInfo'
import { CardForm } from '../CardForm'
import { ICard } from '../../../../models'
import { useFollowSeverStatus } from '../../../../hooks'
import './Vocabulary.css'

// TODO: handle hardcore
const vocabularyId = '6371617f94613befa4ca49a2'

const Vocabulary: FC = () => {
  const [selectedCardId, setSelectedCardId] = useState<string>('')
  const [areCardsScrolled, setAreCardsScrolled] = useState<boolean>(false)

  const {
    isLoading: isVocabularyLoading,
    isError: isVocabularyError,
    data: vocabulary,
  } = useGetVocabularyQuery(vocabularyId)

  const [addCard, { status: addingCardStatus }] = useAddCardMutation()

  const selectedCard = vocabulary
    ? vocabulary.cards.find(card => card._id === selectedCardId)
    : null

  const selectCard = (cardId: string) => {
    setSelectedCardId(cardId)
  }

  // TODO: type data
  const handleAddCard = async (data: { wordName: string }) => {
    await addCard({ vocabularyId, ...data })
  }

  const handleCardsScroll = (evt: React.UIEvent<HTMLUListElement>) => {
    if (evt.currentTarget.scrollTop > 0) setAreCardsScrolled(true)
    else setAreCardsScrolled(false)
  }

  useFollowSeverStatus({ status: addingCardStatus })

  if (isVocabularyLoading) return <div>Loading...</div>
  if (isVocabularyError) return <div>Error occurred</div>

  return (
    <div className="vocabulary">
      <h1 className="vocabulary__title">{vocabulary?.name}</h1>
      <div className="vocabulary__left">
        <CardForm isBordered={areCardsScrolled} onSubmit={handleAddCard} />
        <List<ICard>
          data={vocabulary?.cards!}
          getItemKey={card => card._id}
          onScroll={handleCardsScroll}
          renderItem={card => (
            <WordCard
              card={card}
              isSelected={card._id === selectedCardId}
              onClick={selectCard}
            />
          )}
          listClassName="vocabulary__card-list"
          itemClassName="vocabulary__card-item"
        />
      </div>
      <div className="vocabulary__right">
        {selectedCard
          ? <WordInfo card={selectedCard} />
          : <div>Слово не выбрано</div>
        }
      </div>
    </div>
  )
}

export default Vocabulary

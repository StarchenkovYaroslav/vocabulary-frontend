import { ICard } from '../../../models'
import { IWordCard, ISearchResults } from '../models'
import { ITranslation } from '../../../models'

export const filterWordCards = (
  cards: ICard[],
  searchRequest: string,
): IWordCard[] => {
  const searchRegExp = new RegExp(`(.*?)(${searchRequest})(.*)`, 'i')

  return cards.reduce<IWordCard[]>((filteredCards, card) => {
    const isWordMatched = searchRegExp.test(card.word.name)

    const foundTranslation = card.meanings
      .reduce<ITranslation[]>((translations, meaning) => [...translations, ...meaning.translations], [])
      .find(translation => searchRegExp.test(translation.name))

    if (!isWordMatched && !foundTranslation) return filteredCards

    const searchResults: ISearchResults  = {
      word: null,
      translation: null,
    }

    if (isWordMatched) {
      const wordSearchResult = card.word.name.match(searchRegExp)
      if (wordSearchResult) {
        const [_, formerPlainText, underlinedText, latterPlainText] = wordSearchResult
        searchResults.word = { formerPlainText, underlinedText, latterPlainText }
      }
    }

    if (foundTranslation) {
      const translationSearchResult = foundTranslation.name.match(searchRegExp)
      if (translationSearchResult) {
        const [_, formerPlainText, underlinedText, latterPlainText] = translationSearchResult
        searchResults.translation = { formerPlainText, underlinedText, latterPlainText }
      }
    }

    const wordCard = { ...card, searchResults }

    return [...filteredCards, wordCard]
  }, [])
}

import { ICard } from '../../../models'
import { IWordCard, ISearchResults } from '../models'
import { ITranslation } from '../../../models'

export const filterWordCards = (
  cards: ICard[],
  searchRequest: string,
): IWordCard[] => {
  const finalSearchRequest = searchRequest.replaceAll(/.|\(|\)/g, '\\$&')

  const searchRegExp = new RegExp(`(.*?)(${finalSearchRequest})(.*)`, 'i')

  return cards.reduce<IWordCard[]>((filteredCards, card) => {
    const wordSearchResult = card.word.name.match(searchRegExp)

    const foundTranslation = card.meanings
      .reduce<ITranslation[]>((translations, meaning) => [...translations, ...meaning.translations], [])
      .find(translation => searchRegExp.test(translation.name))

    if (!wordSearchResult && !foundTranslation) return filteredCards

    const searchResults: ISearchResults = {
      word: null,
      translation: null,
    }

    if (wordSearchResult) {
      searchResults.word = {
        formerPlainText: wordSearchResult[1],
        underlinedText: wordSearchResult[2],
        latterPlainText: wordSearchResult[3],
      }
    }

    if (foundTranslation) {
      const translationSearchResult = foundTranslation.name.match(searchRegExp)
      if (translationSearchResult) {
        searchResults.translation = {
          formerPlainText: translationSearchResult[1],
          underlinedText: translationSearchResult[2],
          latterPlainText: translationSearchResult[3],
        }
      }
    }

    return [...filteredCards, { ...card, searchResults }]
  }, [])
}

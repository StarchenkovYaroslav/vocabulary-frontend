import { ICard } from '../../../models'

export interface ISplittedText {
  formerPlainText: string
  underlinedText: string
  latterPlainText: string
}

export interface ISearchResults {
  word: ISplittedText | null
  translation: ISplittedText | null
}

export interface IWordCard extends ICard {
  searchResults?: ISearchResults
}

import { ICard } from '../../../models'

export interface IWordCard extends ICard {
  searchResults?: {
    word: RegExpMatchArray | null,
    translation: RegExpMatchArray | null,
  }
}

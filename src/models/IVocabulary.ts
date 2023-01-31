import { ICard } from './ICard'

export interface IVocabulary {
  _id: string
  name: string
  cards: ICard[]
}

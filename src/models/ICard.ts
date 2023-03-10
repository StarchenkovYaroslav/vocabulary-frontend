import { IMeaning } from './IMeaning'
import { IWord } from './IWord'

export interface ICard {
  _id: string
  word: IWord
  meanings: IMeaning[]
}

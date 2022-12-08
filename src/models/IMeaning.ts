import { ITranslation } from './ITranslation'

export interface IMeaning {
  _id: string
  name: string
  translations: ITranslation[]
}

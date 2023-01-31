export type GetVocabularyRequest = string

export interface AddCardRequest {
  wordName: string
  vocabularyId: string
}

export type RemoveCardRequest = string

export interface CreateMeaningRequest {
  name: string
  cardId: string
}

export type RemoveMeaningRequest = string

export interface RemoveTranslationRequest {
  meaningId: string
  translationId: string
}

export interface AddTranslationRequest {
  meaningId: string
  translationName: string
}

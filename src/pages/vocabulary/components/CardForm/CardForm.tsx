import React, { FC } from 'react'
import { Form, Input, SubmitButton } from '../../../../ui'
import { AddCardRequest, useAddCardMutation } from '../../../../store/api'
import { useFollowServerStatus } from '../../../../hooks'
import './CardForm.css'

type FormValues = Omit<AddCardRequest, 'vocabularyId'>

interface Props {
  vocabularyId: string
}

const CardForm: FC<Props> = ({ vocabularyId }) => {
  const [addCard, { status: addingCardStatus }] = useAddCardMutation()

  useFollowServerStatus({ status: addingCardStatus })

  const handleAddCard = async (args: FormValues) => {
    await addCard({ ...args, vocabularyId })
  }

  return (
    <Form<FormValues> className="card-form" onSubmit={handleAddCard}>
      <Input
        name="wordName"
        type="text"
        className="card-form__input"
        placeholder="Найти/добавить слово"
      />
      <SubmitButton
        className="card-form__button"
        htmlType="submit"
        type="primary"
      >
        +
      </SubmitButton>
    </Form>
  )
}

export default CardForm

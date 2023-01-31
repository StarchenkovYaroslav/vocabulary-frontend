import React, { FC } from 'react'
import { Form, Input, SubmitButton } from '../../../../ui'
import { AddCardRequest } from '../../../../store/api'
import './CardForm.css'

export type FormValues = Omit<AddCardRequest, 'vocabularyId'>

interface Props {
  onSubmit: (args: FormValues) => void
}

const CardForm: FC<Props> = ({ onSubmit }) => {
  return (
    <Form<FormValues> className="card-form" onSubmit={onSubmit}>
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

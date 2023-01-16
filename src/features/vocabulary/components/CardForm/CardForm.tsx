import React, { FC } from 'react'
import { Form, Input, SubmitButton } from '../../../../ui'
import './CardForm.css'

interface Props {
  onSubmit: (args: any) => void
}

const CardForm: FC<Props> = ({ onSubmit }) => {
  return (
    <Form className="card-form" onSubmit={onSubmit}>
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

import React, { FC } from 'react'
import { Form, Input, SubmitButton } from '../../../../ui'
import './CardForm.css'

interface Props {
  onSubmit: (args: any) => void
  isBordered: boolean
}

const CardForm: FC<Props> = ({ onSubmit, isBordered }) => {
  let className = 'card-form'
  if (isBordered) className += ' card-form_bordered'

  return (
    <Form className={className} onSubmit={onSubmit}>
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

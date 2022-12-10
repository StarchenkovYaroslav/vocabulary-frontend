import React, { FC } from 'react'
import './CardForm.css'
import { Form, Input, SubmitButton } from '../../../../ui'

interface Props {
  onSubmit: (args: any) => void
}

const CardForm: FC<Props> = ({ onSubmit }) => {
  return (
    <Form formClassName="card-form" onSubmit={onSubmit}>
      <>
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
      </>
    </Form>
  )
}

export default CardForm

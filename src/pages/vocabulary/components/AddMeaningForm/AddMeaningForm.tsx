import React, { FC } from 'react'
import { Form, Input, SubmitButton } from '../../../../ui'
import { AddMeaningRequest } from '../../../../store/api'
import './AddMeaningForm.css'

export type FormValues = Omit<AddMeaningRequest, 'cardId'>

interface Props {
  onSubmit: (args: FormValues) => void
}

const AddMeaningForm: FC<Props> = ({ onSubmit }) => {
  return (
    <Form<FormValues> className="add-meaning-form" onSubmit={onSubmit}>
      <Input
        className="add-meaning-form__input"
        name="name"
        type="text"
        placeholder="Добавить значение"
      />
      <SubmitButton
        className="add-meaning-form__button"
        htmlType="submit"
        type="primary"
      >
        +
      </SubmitButton>
    </Form>
  )
}

export default AddMeaningForm

import React, { FC } from 'react'
import { Form, Input, SubmitButton } from '../../../../ui'
import './AddMeaningForm.css'

interface Props {
  onSubmit: (args: any) => void
}

const AddMeaningForm: FC<Props> = ({ onSubmit }) => {
  return (
    <Form className="add-meaning-form" onSubmit={onSubmit}>
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

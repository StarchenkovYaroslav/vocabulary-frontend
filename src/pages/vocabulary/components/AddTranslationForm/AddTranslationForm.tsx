import React, { FC } from 'react'
import { Form, Input, SubmitButton } from '../../../../ui'
import { AddTranslationRequest } from '../../../../store/api'
import './AddTranslationForm.css'

export type FormValues = Omit<AddTranslationRequest, 'meaningId'>

interface Props {
  onSubmit: (args: FormValues) => void
}

const AddTranslationForm: FC<Props> = ({ onSubmit }) => {
  return (
    <Form<FormValues> className="add-translation-form" onSubmit={onSubmit}>
      <Input
        className="add-translation-form__input"
        name="translationName"
        type="text"
        placeholder="Добавить перевод"
      />
      <SubmitButton
        className="add-translation-form__button"
        htmlType="submit"
        type="default"
      >
        +
      </SubmitButton>
    </Form>
  )
}

export default AddTranslationForm

import React, { FC } from 'react'
import { Form, Input, SubmitButton } from '../../../../ui'
import './AddTranslationForm.css'

interface Props {
  onSubmit: (args: any) => void
  isVisible: boolean
}

const AddTranslationForm: FC<Props> = ({ onSubmit, isVisible }) => {
  let finalClassName = 'add-translation-form'
  if (isVisible) finalClassName += ' add-translation-form_visible'

  return (
    <Form className={finalClassName} onSubmit={onSubmit}>
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

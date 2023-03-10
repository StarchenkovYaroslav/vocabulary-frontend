import React, { FC } from 'react'
import { Form, Input, SubmitButton } from '../../../../ui'
import { AddTranslationRequest, useAddTranslationMutation } from '../../../../store/api'
import { useFollowServerStatus } from '../../../../hooks'
import './AddTranslationForm.css'

type FormValues = Omit<AddTranslationRequest, 'meaningId'>

interface Props {
  meaningId: string
}

const AddTranslationForm: FC<Props> = ({ meaningId }) => {
  const [
    addTranslation,
    {
      status: translationAddingStatus,
    }
  ] = useAddTranslationMutation()

  useFollowServerStatus({ status: translationAddingStatus })

  const handleAddTranslation = async (args: FormValues) => {
    await addTranslation({ ...args, meaningId })
  }

  return (
    <Form<FormValues>
      className="add-translation-form"
      onSubmit={handleAddTranslation}
    >
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

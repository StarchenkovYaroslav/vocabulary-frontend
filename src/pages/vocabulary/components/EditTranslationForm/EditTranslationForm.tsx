import React, { FC } from 'react'
import { Form, Input, SubmitButton } from '../../../../ui'
import { useFollowServerStatus } from '../../../../hooks'
import { EditTranslationRequest, useEditTranslationMutation } from '../../../../store/api'
import { ITranslation } from '../../../../models/ITranslation'
import './EditTranslationForm.css'

type FormValues = Omit<EditTranslationRequest, 'meaningId' | 'translationId'>

interface Props {
  meaningId: string,
  translation: ITranslation
}

const EditTranslationForm: FC<Props> = ({ meaningId, translation }) => {
  const [
    editTranslation,
    {
      status: translationEditingStatus,
    }
  ] = useEditTranslationMutation()

  useFollowServerStatus({ status: translationEditingStatus })

  const initialValues: FormValues = { translationName: translation.name }

  const handleEditTranslation = async (args: FormValues) => {
    await editTranslation({ ...args, meaningId, translationId: translation._id })
  }

  return (
    <Form<FormValues>
      className="edit-translation-form"
      onSubmit={handleEditTranslation}
      initialValues={initialValues}
    >
      <Input
        className="edit-translation-form__input"
        name="translationName"
        type="text"
        placeholder="Редактировать перевод"
      />
      <SubmitButton
        className="edit-translation-form__button"
        htmlType="submit"
        type="default"
      >
        ok
      </SubmitButton>
    </Form>
  )
}

export default EditTranslationForm

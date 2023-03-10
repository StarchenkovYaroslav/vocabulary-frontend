import React, { FC } from 'react'
import { Form, Input, SubmitButton } from '../../../../ui'
import { EditMeaningRequest, useEditMeaningMutation } from '../../../../store/api'
import { useFollowServerStatus } from '../../../../hooks'
import { IMeaning } from '../../../../models/IMeaning'
import './EditMeaningForm.css'

type FormValues = Omit<EditMeaningRequest, 'id'>

interface Props {
  meaning: IMeaning
}

const EditMeaningForm: FC<Props> = ({ meaning }) => {
  const [
    editMeaning,
    {
      status: meaningEditingStatus,
    }
  ] = useEditMeaningMutation()

  useFollowServerStatus({ status: meaningEditingStatus })

  const initialValues: FormValues = { name: meaning.name }

  const handleEditMeaning = async (args: FormValues) => {
    await editMeaning({ ...args, id: meaning._id })
  }

  return (
    <Form<FormValues>
      className="edit-meaning-form"
      onSubmit={handleEditMeaning}
      initialValues={initialValues}
    >
      <Input
        className="edit-meaning-form__input"
        name="name"
        type="text"
        placeholder="Редактировать значение"
      />
      <SubmitButton
        className="edit-meaning-form__button"
        htmlType="submit"
        type="default"
      >
        ok
      </SubmitButton>
    </Form>
  )
}

export default EditMeaningForm

import React, { FC } from 'react'
import { Form, Input, SubmitButton } from '../../../../ui'
import { AddMeaningRequest, useAddMeaningMutation } from '../../../../store/api'
import { useFollowServerStatus } from '../../../../hooks'
import './AddMeaningForm.css'

type FormValues = Omit<AddMeaningRequest, 'cardId'>

interface Props {
  cardId: string
}

const AddMeaningForm: FC<Props> = ({ cardId }) => {
  const [addMeaning, { status: meaningAddingStatus }] = useAddMeaningMutation()

  useFollowServerStatus({ status: meaningAddingStatus })

  const handleAddMeaning = async (args: FormValues) => {
    await addMeaning({ ...args, cardId })
  }

  return (
    <Form<FormValues> className="add-meaning-form" onSubmit={handleAddMeaning}>
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

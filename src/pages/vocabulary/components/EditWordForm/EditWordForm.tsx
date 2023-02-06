import React, { FC } from 'react'
import { Form, Input, SubmitButton } from '../../../../ui'
import { EditWordRequest, useEditWordMutation } from '../../../../store/api'
import { IWord } from '../../../../models/IWord'
import { useFollowServerStatus } from '../../../../hooks'
import './EditWordForm.css'

type FormValues = Omit<EditWordRequest, 'cardId'>

interface Props {
  cardId: string
  word: IWord
}

const EditWordForm: FC<Props> = ({ cardId, word }) => {
  const [
    editWord,
    {
      status: wordEditingStatus,
    }
  ] = useEditWordMutation()

  useFollowServerStatus({ status: wordEditingStatus })

  const initialValues: FormValues = { wordName: word.name }

  const handleEditWord = async (args: FormValues) => {
    await editWord({ ...args, cardId })
  }

  return (
    <Form<FormValues>
      className="edit-word-form"
      onSubmit={handleEditWord}
      initialValues={initialValues}
    >
      <Input
        className="edit-word-form__input"
        name="wordName"
        type="text"
        placeholder="Редактировать слово"
      />
      <SubmitButton
        className="edit-word-form__button"
        htmlType="submit"
        type="primary"
      >
        ok
      </SubmitButton>
    </Form>
  )
}

export default EditWordForm

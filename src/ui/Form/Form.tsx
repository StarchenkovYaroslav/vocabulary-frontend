import React, { FC } from 'react'
import { Form as FinalForm, FormProps } from 'react-final-form'

interface Props extends FormProps {
  formClassName?: string
}

const Form: FC<Props> = ({
  onSubmit,
  formClassName,
  children,
}) => {
  return (
    <FinalForm onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form className={formClassName} onSubmit={handleSubmit}>
          {/*TODO: type*/}
          {children as React.ReactNode}
        </form>
      )}
    </FinalForm>
  )
}

export default Form

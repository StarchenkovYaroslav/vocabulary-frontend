import React, { FC } from 'react'
import { Form as FinalForm, FormProps } from 'react-final-form'

interface Props extends FormProps {
  className?: string
}

const Form: FC<Props> = ({
  onSubmit,
  className,
  children,
}) => {
  return (
    <FinalForm onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form className={className} onSubmit={handleSubmit}>
          {/*TODO: type*/}
          {children as React.ReactNode}
        </form>
      )}
    </FinalForm>
  )
}

export default Form

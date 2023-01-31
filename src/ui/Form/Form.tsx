import React from 'react'
import { Form as FinalForm, FormProps } from 'react-final-form'

interface Props<FormValues> extends FormProps<FormValues> {
  className?: string
}

function Form<FormValues>({
  onSubmit,
  className,
  children,
}: Props<FormValues>) {
  return (
    <FinalForm<FormValues> onSubmit={onSubmit}>
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

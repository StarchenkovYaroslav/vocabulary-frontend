import React, { PropsWithChildren } from 'react'
import { Form as FinalForm, FormProps } from 'react-final-form'

interface Props<FormValues> extends FormProps<FormValues> {
  className?: string
}

function Form<FormValues>({
  onSubmit,
  className,
  children,
}: PropsWithChildren<Props<FormValues>>) {
  return (
    <FinalForm<FormValues> onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form className={className} onSubmit={handleSubmit}>
          {children}
        </form>
      )}
    </FinalForm>
  )
}

export default Form

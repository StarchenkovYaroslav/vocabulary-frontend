import React, { FC } from 'react'
import { Input as AntInput } from 'antd'
import { Field, FieldProps, FieldRenderProps } from 'react-final-form'
import { InputProps } from 'antd/es/input/Input'

type Props = FieldProps<string, FieldRenderProps<string>> & InputProps

const Input: FC<Props> = ({
  name,
  type,
  className,
  placeholder,
}) => {
  return (
    <Field name={name} type={type}>
      {({ input, meta }) => (
        <AntInput
          className={className}
          placeholder={placeholder}
          disabled={meta.submitting}
          {...input}
        />
      )}
    </Field>
  )
}

export default Input

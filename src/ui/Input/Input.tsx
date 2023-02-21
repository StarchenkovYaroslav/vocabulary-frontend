import React, { ChangeEventHandler, FC } from 'react'
import { Input as AntInput } from 'antd'
import { Field, FieldProps, FieldRenderProps } from 'react-final-form'
import { InputProps } from 'antd/es/input/Input'

type Props = FieldProps<string, FieldRenderProps<string>> & InputProps

const Input: FC<Props> = ({
  name,
  type,
  className,
  placeholder,
  onChange: customOnChange,
}) => {
  return (
    <Field name={name} type={type} >
      {({ input, meta }) => {
        const { onChange: initialOnChange, ...otherProps } = input
        const finalOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
          initialOnChange(event)
          if (customOnChange) customOnChange(event)
        }

        return (
          <AntInput
            className={className}
            placeholder={placeholder}
            disabled={meta.submitting}
            onChange={finalOnChange}
            {...otherProps}
          />
        )
      }}
    </Field>
  )
}

export default Input

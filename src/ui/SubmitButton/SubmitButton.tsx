import React, { FC, PropsWithChildren } from 'react'
import { Button as AntButton } from 'antd'
import { ButtonProps } from 'antd/es/button/button'
import { useFormState } from 'react-final-form'

type Props = ButtonProps

const SubmitButton: FC<PropsWithChildren<Props>> = ({
  children,
  disabled,
  ...props
}) => {
  const { invalid, submitting } = useFormState()

  const isDisabled = disabled || invalid
  return (
    <AntButton
      htmlType="submit"
      disabled={isDisabled}
      loading={submitting}
      {...props}
    >
      {children}
    </AntButton>
  )
}

export default SubmitButton

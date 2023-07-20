import React from 'react'
import { FieldError, useFormContext } from 'react-hook-form'
import { Input } from '../../fields'
import { FormInputProps } from './types'

const FormInput: React.FC<FormInputProps> = ({ name, ...props }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[name] as FieldError | undefined

  return (
    <div>
      <Input {...register(name)} {...props} />
      {error && typeof error === 'string' && <span>{error}</span>}
      {error && typeof error === 'object' && <span>{error.message}</span>}
    </div>
  )
}

export default FormInput

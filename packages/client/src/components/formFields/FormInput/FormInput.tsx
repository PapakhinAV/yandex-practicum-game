import React from 'react'
import { FieldError, useFormContext } from 'react-hook-form'
import { Input } from '../../fields'
import { FormInputProps } from './types'
import styles from './FormInput.module.scss'

const FormInput: React.FC<FormInputProps> = ({
  name,
  registerOptions,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const error = errors[name] as FieldError | undefined

  return (
    <>
      <Input register={register(name, registerOptions)} {...props} />
      {error && <span className={styles.error}>{error.message}</span>}
    </>
  )
}

export default FormInput

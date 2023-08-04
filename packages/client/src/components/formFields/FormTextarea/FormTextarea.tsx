import React from 'react'
import { FieldError, useFormContext } from 'react-hook-form'
import { Textarea } from '../../fields'
import { FormTextareaProps } from './types'
import styles from './FormTextarea.module.scss'

const FormTextarea: React.FC<FormTextareaProps> = ({ 
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
      <Textarea register={register(name, registerOptions)} {...props}/>
      {error && <span className={styles.error}>{error.message}</span>}
    </>
  )
}

export default FormTextarea

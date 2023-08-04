import { FieldValues, RegisterOptions } from 'react-hook-form'
import { CustomTextareaProps } from '../../fields'

export type FormTextareaProps = {
  name: keyof FieldValues,
  registerOptions?: RegisterOptions
} & CustomTextareaProps

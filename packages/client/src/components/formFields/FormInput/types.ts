import { FieldValues, RegisterOptions } from 'react-hook-form'
import { CustomInputProps } from '../../fields'

export type FormInputProps = {
  name: keyof FieldValues,
  registerOptions?: RegisterOptions
} & CustomInputProps

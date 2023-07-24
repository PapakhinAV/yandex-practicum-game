import { FieldValues, RegisterOptions } from 'react-hook-form'

export interface FormInputProps {
  name: keyof FieldValues
  registerOptions?: RegisterOptions
}

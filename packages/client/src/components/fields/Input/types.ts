import { InputHTMLAttributes } from 'react'
import { InputProps } from '@chakra-ui/react'

export type CustomInputProps = InputHTMLAttributes<HTMLInputElement> &
  InputProps

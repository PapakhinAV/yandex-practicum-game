import { InputHTMLAttributes } from 'react'
import { InputProps } from '@chakra-ui/react'
import { UseFormRegisterReturn } from 'react-hook-form'

export type CustomInputProps = InputHTMLAttributes<HTMLInputElement> &
  InputProps & {
    register?: UseFormRegisterReturn
  }

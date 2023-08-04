import { TextareaHTMLAttributes } from 'react'
import { TextareaProps } from '@chakra-ui/react'
import { UseFormRegisterReturn } from 'react-hook-form'

export type CustomTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  TextareaProps & {
    register?: UseFormRegisterReturn
  }

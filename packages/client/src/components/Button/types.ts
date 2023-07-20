import { ButtonHTMLAttributes } from 'react'
import { ButtonProps } from '@chakra-ui/react'

export type CustomButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonProps

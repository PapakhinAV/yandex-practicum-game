import { ButtonHTMLAttributes } from 'react'
import { ButtonProps } from '@chakra-ui/react'
import { IconType } from 'react-icons'

export interface INavButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, ButtonProps {
  direction: ENavButtonDirection
  customRoute?: string
  CustomIcon?:  IconType
}

export enum ENavButtonDirection {
  BACK = 'back',
  HOME = 'home',
  CUSTOM = 'custom'
}

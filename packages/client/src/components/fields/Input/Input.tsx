import React from 'react'
import { Input } from '@chakra-ui/react'
import { CustomInputProps } from './types'

const CustomInput: React.FC<CustomInputProps> = ({ className, ...props }) => {
  return <Input {...props} className={(className)} />
}

export default CustomInput

import React from 'react'
import { Input } from '@chakra-ui/react'
import { CustomInputProps } from './types'

const CustomInput: React.FC<CustomInputProps> = ({
  className,
  register,
  ...props
}) => {
  return <Input {...props} {...register} className={className} />
}

export default CustomInput

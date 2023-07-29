import React from 'react'
import { Textarea } from '@chakra-ui/react'
import { CustomTextareaProps } from './types'

const CustomTextarea: React.FC<CustomTextareaProps> = ({ 
  className, 
  register,
  ...props 
}) => {
  return <Textarea {...props} {...register} className={className} />
}

export default CustomTextarea

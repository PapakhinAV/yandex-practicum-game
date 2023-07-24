import React from 'react'
import { Input } from '@chakra-ui/react'
import { CustomInputProps } from './types'
import classNames from 'classnames'

const CustomInput: React.FC<CustomInputProps> = ({
  className,
  register,
  ...props
}) => {
  return <Input {...props} {...register} className={classNames(className)} />
}

export default CustomInput

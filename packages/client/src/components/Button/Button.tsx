import React from 'react'
import { Button } from '@chakra-ui/react'
import { CustomButtonProps } from './types'
import classNames from 'classnames'

const CustomButton: React.FC<CustomButtonProps> = ({ className, ...props }) => {
  return (
    <Button colorScheme="blue" {...props} className={classNames(className)}>
      {props.children}
    </Button>
  )
}

export default CustomButton

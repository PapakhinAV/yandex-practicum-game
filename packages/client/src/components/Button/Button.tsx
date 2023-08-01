import React from 'react'
import { Button } from '@chakra-ui/react'
import { CustomButtonProps } from './types'

const CustomButton: React.FC<CustomButtonProps> = ({
  className,
  disabled,
  ...props
}) => {
  return (
    <Button
      colorScheme={disabled ? 'blackAlpha' : 'blue'}
      {...props}
      className={className}
    >
      {props.children}
    </Button>
  )
}

export default CustomButton

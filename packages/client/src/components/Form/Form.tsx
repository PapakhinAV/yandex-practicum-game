import React from 'react'
import { FormProvider, Form } from 'react-hook-form'
import { CustomFormProps } from './types'

const CustomForm: React.FC<CustomFormProps> = ({
  onSubmit,
  methods,
  children,
}) => {
  return (
    <FormProvider {...methods}>
      <Form onSubmit={onSubmit}>{children}</Form>
    </FormProvider>
  )
}

export default CustomForm

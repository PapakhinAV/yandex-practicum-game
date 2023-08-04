import React from 'react'
import { FormProvider, Form } from 'react-hook-form'
import { CustomFormProps } from './types'

const CustomForm: React.FC<CustomFormProps> = ({
  onSubmit,
  methods,
  className,
  children,
}) => {
  return (
    <FormProvider {...methods}>
      <Form className={className} onSubmit={onSubmit}>{children}</Form>
    </FormProvider>
  )
}

export default CustomForm

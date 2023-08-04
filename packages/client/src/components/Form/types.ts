import { SubmitHandler, useForm } from 'react-hook-form'
import React from 'react'

export interface CustomFormProps {
  onSubmit: SubmitHandler<any>
  methods: ReturnType<typeof useForm>
  className?: string,
  children: React.ReactNode
}

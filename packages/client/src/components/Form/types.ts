import { useForm } from 'react-hook-form'
import React from 'react'

export interface CustomFormProps {
  onSubmit: () => Promise<void>;
  methods: ReturnType<typeof useForm>;
  children: React.ReactNode;
}

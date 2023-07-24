export type TValidatorParam = (
  value: string,
  customMessage?: string,
  formValues?: Record<string, string>
) => string | undefined

import { TValidatorParam } from './types'

export const nameValidator: TValidatorParam = (
  name = '',
  customErrorMessage
) => {
  const errors = []

  if (!/^[A-Za-zА-Яа-яЁё-]+$/.test(name)) {
    errors.push(
      'Имя может состоять только из букв (кириллица или латиница) и дефиса'
    )
  }
  if (!/^[A-ZА-ЯЁ]/.test(name)) {
    errors.push('Имя должно начинаться с заглавной буквы')
  }
  if (!errors.length) {
    return
  }

  return customErrorMessage || errors.join(', ')
}

export const loginValidator: TValidatorParam = (
  login = '',
  customErrorMessage
) => {
  const errors = []

  if (login.length < 3 || login.length > 20) {
    errors.push('Логин должен быть от 3 до 20 символов')
  }
  if (!/^[A-Za-z0-9\-_]+$/.test(login)) {
    errors.push(
      'Логин может содержать только латинские буквы, цифры, дефис и нижнее подчеркивание'
    )
  }
  if (/\d+/g.test(login) && !/[a-zA-Z]/.test(login)) {
    errors.push('Логин не может состоять только из цифр')
  }
  if (!errors.length) {
    return
  }

  return customErrorMessage || errors.join(', ')
}

export const emailValidator: TValidatorParam = (
  email = '',
  customErrorMessage
) => {
  const errors = []

  if (!/@/.test(email)) {
    errors.push('Email должен содержать символ \'@\'')
  }
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
    errors.push('Введите действительный адрес электронной почты')
  }
  if (!errors.length) {
    return
  }

  return customErrorMessage || errors.join(', ')
}

export const passwordValidator: TValidatorParam = (
  password = '',
  customErrorMessage
) => {
  const errors = []

  if (password.length < 8 || password.length > 40) {
    errors.push('Пароль должен быть от 8 до 40 символов')
  }
  if (!/\d/.test(password)) {
    errors.push('Пароль должен содержать хотя бы одну цифру')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Пароль должен содержать хотя бы одну заглавную букву')
  }
  if (!errors.length) {
    return
  }

  return customErrorMessage || errors.join(', ')
}

export const phoneValidator: TValidatorParam = (
  phone = '',
  customErrorMessage
) => {
  const errors = []

  if (phone.length < 10 || phone.length > 15) {
    errors.push('Номер телефона должен быть от 10 до 15 символов')
  }
  if (!/^(\+)?(\d+)$/.test(phone)) {
    errors.push(
      'Номер телефона должен содержать только цифры и может начинаться с \'+\'\''
    )
  }
  if (!errors.length) {
    return
  }

  return customErrorMessage || errors.join(', ')
}

export const topicTitleValidator: TValidatorParam = (
  title = '', 
  customErrorMessage
) => {
  const errors = []

  if (title.length < 1 || title.length > 80) {
    errors.push('Должно содержать от 1 до 80 символов')
  }
  if (!errors.length) {
    return 
  }

  return customErrorMessage || errors.join(', ')
}

export const messageValidator: TValidatorParam = (
  message = '', 
  customErrorMessage
) => {
  const errors = []

  if (message.length === 0) {
    errors.push('Не может быть пустым')
  }
  if (!errors.length) {
    return
  }

  return customErrorMessage || errors.join(', ')
}

export const twoPasswordValidator: TValidatorParam = (
  password = '',
  customErrorMessage,
  formValues,
  passwordKey
) => {
  const twoPassword = passwordKey && formValues ? formValues[passwordKey] : formValues?.newPassword
  if (password !== twoPassword) {
    return customErrorMessage || 'Пароли не совпадают'
  }
  return undefined
}

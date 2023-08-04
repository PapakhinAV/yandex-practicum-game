import {
  nameValidator,
  loginValidator,
  emailValidator,
  passwordValidator,
  phoneValidator,
  topicTitleValidator,
  messageValidator
} from './validators'

describe('Валидаторы полей', () => {
  const customError = 'Кастомное сообщение об ошибке'

  describe('nameValidator', () => {
    it('Возвращает ошибку если имя содержит недопустимые символы', () => {
      expect(nameValidator('User#')).toEqual(
        'Имя может состоять только из букв (кириллица или латиница) и дефиса'
      )
    })
    it('Возвращает ошибку если имя начинается со строчной буквы', () => {
      expect(nameValidator('user')).toEqual(
        'Имя должно начинаться с заглавной буквы'
      )
    })
    it('Возвращает кастомное сообщение об ошибке, если таковое передано', () => {
      expect(nameValidator('user', customError)).toEqual(customError)
    })
    it('Не возвращает ошибку для корректного имени', () => {
      expect(nameValidator('User')).toBeUndefined()
    })
  })

  describe('loginValidator', () => {
    it('Возвращает ошибку если логин короче 3 символов или длиннее 20 символов', () => {
      expect(loginValidator('Us')).toEqual(
        'Логин должен быть от 3 до 20 символов'
      )
      expect(loginValidator('U'.repeat(21))).toEqual(
        'Логин должен быть от 3 до 20 символов'
      )
    })
    it('Возвращает ошибку если логин состоит только из цифр', () => {
      expect(loginValidator('123456')).toEqual(
        'Логин не может состоять только из цифр'
      )
    })
    it('Возвращает кастомное сообщение об ошибке, если таковое передано', () => {
      expect(loginValidator('Us', customError)).toEqual(customError)
    })
    it('Не возвращает ошибку для корректного логина', () => {
      expect(loginValidator('User1234')).toBeUndefined()
    })
  })

  describe('emailValidator', () => {
    it('Возвращает ошибку если email не содержит символ "@"', () => {
      expect(emailValidator('user.domain')).toEqual(
        'Email должен содержать символ \'@\', Введите действительный адрес электронной почты'
      )
    })

    it('Возвращает ошибку если email не содержит точку после "@"', () => {
      expect(emailValidator('user@domain')).toEqual(
        'Введите действительный адрес электронной почты'
      )
    })

    it('Возвращает ошибку если перед "." нет букв', () => {
      expect(emailValidator('user@.com')).toEqual(
        'Введите действительный адрес электронной почты'
      )
    })

    it('Возвращает ошибку если email не соответствует общепринятому формату', () => {
      expect(emailValidator('example@example')).toEqual(
        'Введите действительный адрес электронной почты'
      )
    })

    it('Возвращает кастомное сообщение об ошибке, если таковое передано', () => {
      expect(emailValidator('user@.com', customError)).toEqual(customError)
    })

    it('Не возвращает ошибку для корректного email', () => {
      expect(emailValidator('user@domain.com')).toBeUndefined()
      expect(emailValidator('user.name@domain.com')).toBeUndefined()
      expect(emailValidator('user_name@domain.io')).toBeUndefined()
    })
  })

  describe('passwordValidator', () => {
    it('Возвращает ошибку если пароль короче 8 символов или длиннее 40 символов', () => {
      expect(passwordValidator('Pass12')).toEqual(
        'Пароль должен быть от 8 до 40 символов'
      )
      expect(passwordValidator('P'.repeat(41))).toEqual(
        'Пароль должен быть от 8 до 40 символов, Пароль должен содержать хотя бы одну цифру'
      )
    })
    it('Возвращает ошибку если пароль не содержит хотя бы одну заглавную букву и цифру', () => {
      expect(passwordValidator('password')).toEqual(
        'Пароль должен содержать хотя бы одну цифру, Пароль должен содержать хотя бы одну заглавную букву'
      )
      expect(passwordValidator('PASSWORD')).toEqual(
        'Пароль должен содержать хотя бы одну цифру'
      )
      expect(passwordValidator('12345678')).toEqual(
        'Пароль должен содержать хотя бы одну заглавную букву'
      )
    })
    it('Возвращает кастомное сообщение об ошибке, если таковое передано', () => {
      expect(passwordValidator('Pass12', customError)).toEqual(customError)
    })
    it('Не возвращает ошибку для корректного пароля', () => {
      expect(passwordValidator('Password123')).toBeUndefined()
    })
  })

  describe('phoneValidator', () => {
    it('Возвращает ошибку если телефон короче 10 символов или длиннее 15 символов', () => {
      expect(phoneValidator('123456789')).toEqual(
        'Номер телефона должен быть от 10 до 15 символов'
      )
      expect(phoneValidator('1'.repeat(16))).toEqual(
        'Номер телефона должен быть от 10 до 15 символов'
      )
    })
    it('Возвращает ошибку если телефон содержит символы, отличные от цифр и плюса в начале', () => {
      expect(phoneValidator('123456789a')).toEqual(
        'Номер телефона должен содержать только цифры и может начинаться с \'+\'\''
      )
      expect(phoneValidator('+123456789a')).toEqual(
        'Номер телефона должен содержать только цифры и может начинаться с \'+\'\''
      )
    })
    it('Возвращает кастомное сообщение об ошибке, если таковое передано', () => {
      expect(phoneValidator('123456789', customError)).toEqual(customError)
    })
    it('Не возвращает ошибку для корректного телефона', () => {
      expect(phoneValidator('1234567890')).toBeUndefined()
      expect(phoneValidator('+1234567890')).toBeUndefined()
    })
  })

  describe('topicTitleValidator', () => {
    it('Возвращает ошибку если название темы пустое либо длиннее 80 символов', () => {
      expect(topicTitleValidator('')).toEqual(
        'Должно содержать от 1 до 80 символов'
      )
      expect(topicTitleValidator('1'.repeat(81))).toEqual(
        'Должно содержать от 1 до 80 символов'
      )
    })
    it('Возвращает кастомное сообщение об ошибке, если таковое передано', () => {
      expect(topicTitleValidator('', customError)).toEqual(customError)
    })
    it('Не возвращает ошибку для корректного телефона', () => {
      expect(topicTitleValidator('Пример корретного названия')).toBeUndefined()
    })
  })

  describe('messageValidator', () => {
    it('Возвращает ошибку если текст сообщения пустой', () => {
      expect(messageValidator('')).toEqual(
        'Не может быть пустым'
      )
    })
    it('Возвращает кастомное сообщение об ошибке, если таковое передано', () => {
      expect(messageValidator('', customError)).toEqual(customError)
    })
    it('Не возвращает ошибку для корректного телефона', () => {
      expect(messageValidator('Пример корретного сообщения')).toBeUndefined()
    })
  })
})

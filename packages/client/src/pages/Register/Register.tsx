import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ERoutes } from '../../core/Router/ERoutes'
import {
  emailValidator,
  nameValidator,
  lastNameValidator,
  passwordValidator,
  twoPasswordValidator,
  phoneValidator,
  loginValidator,
} from '../../utils/validators/validators'
import CustomForm from '../../components/Form/Form'
import FormInput from '../../components/formFields/FormInput/FormInput'
import CustomButton from '../../components/Button/Button'
import styles from './register.module.scss'
import { NavButton } from '../../components'
import { ENavButtonDirection } from '../../components/NavButton/types'
import { Box } from '@chakra-ui/react'
import { useSignupMutation } from '../../api/auth'

const Register = () => {
  const methods = useForm()
  const [signup, { isLoading, isError }] = useSignupMutation()

  const onSubmit = async (data: unknown) => {
  await signup(data).unwrap()
  }

  return (
    <>
      <Box position={'absolute'} left={4} top={4} >
        <NavButton direction={ENavButtonDirection.HOME}/>
      </Box>
      <div className={styles.register}>
        <div className={styles.register__wrapper}>
          <h2 className={styles.register__title}>Регистрация</h2>
          <CustomForm
            className={styles.register__form}
            onSubmit={methods.handleSubmit(onSubmit)}
            methods={methods}>
            <>
              <div>
                <label>Почта</label>

              <FormInput
                name="email"
                registerOptions={{
                  validate: value => emailValidator(value),
                }}
              />
            </div>
            <div className={styles.register__field}>
              <div className={styles.register__item}>
                <label>Логин</label>

                <FormInput
                  name="login"
                  registerOptions={{
                    validate: value => loginValidator(value),
                  }}
                />
              </div>
              <div className={styles.register__item}>
                <label>Телефон</label>

                <FormInput
                  name="phone"
                  registerOptions={{
                    validate: value => phoneValidator(value),
                  }}
                />
              </div>
            </div>

            <div className={styles.register__field}>
              <div className={styles.register__item}>
                <label>Имя</label>

                <FormInput
                  name="first_name"
                  registerOptions={{
                    validate: value => nameValidator(value),
                  }}
                />
              </div>
              <div className={styles.register__item}>
                <label>Фамилия</label>

                <FormInput
                  name="second_name"
                  registerOptions={{
                    validate: value => lastNameValidator(value),
                  }}
                />
              </div>
            </div>

            <div className={styles.register__field}>
              <div className={styles.register__item}>
                <label>Пароль</label>

                <FormInput
                  name="password"
                  registerOptions={{
                    validate: value => passwordValidator(value),
                  }}
                
                />
              </div>
              <div className={styles.register__item}>
                <label>Пароль (еще раз)</label>

                <FormInput
                  name="repeat_password"
                  registerOptions={{
                    validate: (value, formValues) =>
                      twoPasswordValidator(value, undefined, formValues, 'password'),
                  }}
                />
              </div>
            </div>

            <div className={styles.register__button_wrapper}>
            { isError
              && <span className={styles.register__error}>Сообщение об ошибке формы</span>
            }

            <CustomButton className={styles.register__button} type="submit" disabled={isLoading}>
              Отправить
            </CustomButton>
            </div>

              <Link className={styles.register__link} to={ERoutes.LOGIN}>
                Войти
              </Link>
            </>
          </CustomForm>
        </div>
      </div>
    </>
  )
}

export default Register

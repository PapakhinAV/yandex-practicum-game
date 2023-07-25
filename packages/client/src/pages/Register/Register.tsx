import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ERoutes } from '../../core/Router/ERoutes'
import CustomForm from '../../components/Form/Form'
import CustomInput from '../../components/fields/Input/Input'
import CustomButton from '../../components/Button/Button'
import styles from './register.module.scss'

const Register = () => {
  const methods = useForm()

  const onSubmit = (data: unknown) => {
    console.log(data)
  }

  return (
    <div className={styles.register}>
      <div className={styles.register__wrapper}>
        <h2 className={styles.register__title}>Регистрация</h2>
        <CustomForm
          className={styles.register__form}
          onSubmit={methods.handleSubmit(onSubmit)}
          methods={methods}>
          <React.Fragment>
            <div>
              <label>Почта</label>

              <CustomInput
                placeholder="email"
                name="email"
                type="email"></CustomInput>
            </div>
            <div className={styles.register__field}>
              <div>
                <label>Логин</label>

                <CustomInput name="login" placeholder="login"></CustomInput>
              </div>
              <div>
                <label>Телефон</label>

                <CustomInput
                  name="phone"
                  placeholder="phone"
                  type="phone"></CustomInput>
              </div>
            </div>

            <div className={styles.register__field}>
              <div>
                <label>Имя</label>

                <CustomInput
                  name="first_name"
                  placeholder="first name"></CustomInput>
              </div>
              <div>
                <label>Фамилия</label>

                <CustomInput
                  name="second_name"
                  placeholder="second name"></CustomInput>
              </div>
            </div>

            <div className={styles.register__field}>
              <div>
                <label>Пароль</label>

                <CustomInput
                  name="password"
                  placeholder="password"
                  type="password"></CustomInput>
              </div>
              <div>
                <label>Пароль (еще раз)</label>

                <CustomInput
                  name="repeat_pasword"
                  placeholder="password"
                  type="password"></CustomInput>
              </div>
            </div>

            <span className={styles.register__error}>Form error message</span>

            <CustomButton className={styles.register__button} type="submit">
              Отправить
            </CustomButton>

            <Link className={styles.register__link} to={ERoutes.LOGIN}>
              Войти
            </Link>
          </React.Fragment>
        </CustomForm>
      </div>
    </div>
  )
}

export default Register

import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
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
              <CustomInput></CustomInput>
            </div>
            <div className={styles.register__field}>
              <div>
                <label>Логин</label>
                <CustomInput></CustomInput>
              </div>
              <div>
                <label>Телефон</label>
                <CustomInput></CustomInput>
              </div>
            </div>

            <div className={styles.register__field}>
              <div>
                <label>Имя</label>
                <CustomInput></CustomInput>
              </div>
              <div>
                <label>Фамилия</label>
                <CustomInput></CustomInput>
              </div>
            </div>

            <div className={styles.register__field}>
              <div>
                <label>Пароль</label>
                <CustomInput></CustomInput>
              </div>
              <div>
                <label>Пароль (еще раз)</label>
                <CustomInput></CustomInput>
              </div>
            </div>

            <span className={styles.register__error}>Form error message</span>

            <CustomButton className={styles.register__button} type="submit">
              Отправить
            </CustomButton>

            <Link className={styles.register__link} to={'/login'}>
              Войти
            </Link>
          </React.Fragment>
        </CustomForm>
      </div>
    </div>
  )
}

export default Register

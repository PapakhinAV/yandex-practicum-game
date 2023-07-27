import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ERoutes } from '../../core/Router/ERoutes'
import CustomForm from '../../components/Form/Form'
import FormInput from '../../components/formFields/FormInput/FormInput'
import CustomButton from '../../components/Button/Button'
import styles from './Login.module.scss'

const Login = () => {
  const methods = useForm()

  const onSubmit = (data: unknown) => {
    console.log(data)
  }

  return (
    <div className={styles.login}>
      <div className={styles.login__wrapper}>
        <h2 className={styles.login__title}>Вход</h2>

        <CustomForm
          className={styles.login__form}
          onSubmit={methods.handleSubmit(onSubmit)}
          methods={methods}>
          {
            <>
              <div className={styles.login__field}>
                <label>Логин</label>

                <FormInput name="login" />
              </div>

              <div>
                <label>Пароль</label>

                <FormInput name="password" />
              </div>

              <span className={styles.login__error}>
                Login or password is incorrect
              </span>

              <CustomButton className={styles.login__button} type="submit">
                Авторизоваться
              </CustomButton>
            </>
          }
        </CustomForm>

        <Link className={styles['login__link--help']} to={'/'}>
          Войти с помощью
        </Link>

        <div className={styles.login__logo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none">
            <path
              d="M0 16C0 7.1632 7.1616 0 16 0C24.8352 0 32 7.1632 32 16C32 24.8368 24.8352 32 16 32C7.1616 32 0 24.8368 0 16Z"
              fill="#FC3F1D"
            />
            <path
              d="M18.0479 9.0656H16.5695C13.8591 9.0656 12.4335 10.4384 12.4335 12.4624C12.4335 14.7504 13.4191 15.8224 15.4431 17.1968L17.1151 18.3232L12.3103 25.5024H8.71992L13.0319 19.08C10.5519 17.3024 9.15993 15.576 9.15993 12.656C9.15993 8.9952 11.7119 6.496 16.5519 6.496H21.3567V25.4848H18.0479V9.0656Z"
              fill="white"
            />
          </svg>
        </div>

        <Link className={styles['login__link--register']} to={ERoutes.REGISTER}>
          Нет аккаунта?
        </Link>
      </div>
    </div>
  )
}

export default Login

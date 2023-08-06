import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ERoutes } from '../../core/Router/ERoutes'
import CustomForm from '../../components/Form/Form'
import FormInput from '../../components/formFields/FormInput/FormInput'
import CustomButton from '../../components/Button/Button'
import styles from './Login.module.scss'
import Logo from '../../../public/logo'

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
            Логин или пароль неверный
            </span>

            <CustomButton className={styles.login__button} type="submit">
              Авторизоваться
            </CustomButton>
          </>
        </CustomForm>

        <Link className={styles['login__link--help']} to={'/'}>
          Войти с помощью
        </Link>

        <div className={styles.login__logo}>
          <Logo></Logo>
        </div>

        <Link className={styles['login__link--register']} to={ERoutes.REGISTER}>
          Нет аккаунта?
        </Link>
      </div>
    </div>
  )
}

export default Login

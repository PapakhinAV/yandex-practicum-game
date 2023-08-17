import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { ERoutes } from '../../core/Router/ERoutes'
import { signinAndFetchUser } from '../../store/Chunk'
import CustomForm from '../../components/Form/Form'
import { passwordValidator, loginValidator } from '../../utils/validators/validators'
import FormInput from '../../components/formFields/FormInput/FormInput'
import CustomButton from '../../components/Button/Button'
import styles from './Login.module.scss'
import Logo from '../../../public/logo'
import { NavButton } from '../../components'
import { ENavButtonDirection } from '../../components/NavButton/types'
import { Box } from '@chakra-ui/react'
import { AppDispatch } from '../../store/store'
import { IRootState } from '../../store/types'


const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const methods = useForm()
  const isError = useSelector((state: IRootState) => state.app.loginError)

  const onSubmit = async (data: Record<string, string>) => {
    dispatch(signinAndFetchUser({
      login: data.login,
      password: data.password,
  }))
  }

  return (
    <>
      <Box position={'absolute'} left={4} top={4} >
        <NavButton direction={ENavButtonDirection.HOME}/>
      </Box>
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

              <FormInput
                name="login"
                registerOptions={{
                validate: value => loginValidator(value),
                }}
              />
            </div>

              <div>
                <label>Пароль</label>

              <FormInput
                type="password"
                name="password"
                registerOptions={{
                validate: value => passwordValidator(value),
                }}
              />
            </div>

           <div className={styles.login__button_wrapper}>
            { isError
                && <span className={styles.login__error}>
                Логин или пароль неверный
                </span>
              }

              <CustomButton className={styles.login__button} type="submit">
                Авторизоваться
              </CustomButton>
           </div>
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
    </>
  )
}

export default Login

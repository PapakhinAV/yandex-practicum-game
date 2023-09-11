import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ERoutes } from '../../core/Router/ERoutes'
import { signinAndFetchUser } from '../../store/Thunk'
import CustomForm from '../../components/Form/Form'
import { passwordValidator, loginValidator } from '../../utils/validators/validators'
import FormInput from '../../components/formFields/FormInput/FormInput'
import CustomButton from '../../components/Button/Button'
import styles from './Login.module.scss'
import Logo from '../../../public/logo'
import { NavButton } from '../../components'
import { ENavButtonDirection } from '../../components/NavButton/types'
import { Box, Button } from '@chakra-ui/react'
import { AppDispatch } from '../../store/store'
import { IRootState } from '../../store/types'
import { resetErrorMessage } from '../../store/appReducer'
import { oauthApi } from '../../api/oauth'
import { OAUTH_REDIRECT_URL } from '../../api/constants'

const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const methods = useForm()
  const errorMessage = useSelector((state: IRootState) => state.app.errorMessage)

  const onSubmit = async (data: Record<string, string>) => {
    dispatch(signinAndFetchUser({
      login: data.login,
      password: data.password,
    }))
  }

  useEffect(() => {
    dispatch(resetErrorMessage())
  }, [])

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
            { errorMessage
                && <span className={styles.login__error}>
                {errorMessage}
                </span>
              }

              <CustomButton className={styles.login__button} type="submit">
                Авторизоваться
              </CustomButton>
           </div>
          </>
        </CustomForm>

          <Box className={styles['login__link--title']}>
            Войти с помощью
          </Box>

          <Button
            className={styles.login__logo}
            variant="link"
            onClick={async () => {
              const { data, isError } =  await dispatch(oauthApi.endpoints.getServiceId.initiate(OAUTH_REDIRECT_URL))
              
              if (!isError) {
                window.location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data?.service_id}&redirect_uri=${OAUTH_REDIRECT_URL}`
              }
            }}
          >
            <Logo />
          </Button>

          <Link className={styles['login__link--register']} to={ERoutes.REGISTER}>
            Нет аккаунта?
          </Link>
        </div>
      </div>
    </>
  )
}

export default Login

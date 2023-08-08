import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ERoutes } from '../../core/Router/ERoutes'
import { Button } from '../../components'
import { Box } from '@chakra-ui/react'
import { useLogoutMutation } from '../../reducers/auth'
import withAuth from './hocs/withAuth'
import withoutAuth from './hocs/withoutAuth'
import menu_ork from './assets/menu_ork.png'

const Home: FC = () => {
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()

  const ButtonWithAuth = withAuth(Button)
  const ButtonWithoutAuth = withoutAuth(Button)

  return (
    <Box
      display='grid'
      maxW={600}
      border='12px'
      background='blackAlpha.400'
      gap='25px'
      position='absolute'
      top='50%'
      left='50%'
      marginRight='-50%'
      transform='translate(-50%, -50%)'
      borderRadius='12px'
      justifyContent='center'
      padding='100px 60px 70px'
    >
      <Box
        background={`url(${menu_ork})`}
        backgroundRepeat='no-repeat'
        backgroundSize='contain'
        position='absolute'
        top='-116px'
        left='120px'
        width='200px'
        height='139px'
      />
      <Button
        width='250px'
        onClick={() => navigate(ERoutes.GAME)}
      >
        Играть
      </Button>
      <ButtonWithAuth
        width='250px'
        onClick={() => navigate(ERoutes.PROFILE)}
      >
        Профиль
      </ButtonWithAuth>
      <ButtonWithAuth
        width='250px'
        onClick={() => navigate(ERoutes.LEADERBOARD)}
      >
        Таблица лидеров
      </ButtonWithAuth>
      <ButtonWithoutAuth
        width='250px'
        onClick={() => navigate(ERoutes.LOGIN)}
      >
        Авторизация
      </ButtonWithoutAuth>
      <ButtonWithoutAuth
        width='250px'
        onClick={() => navigate(ERoutes.REGISTER)}
      >
        Регистрация
      </ButtonWithoutAuth>
      <Button
        width='250px'
        onClick={() => navigate(ERoutes.FORUM)}
      >
        Форум
      </Button>
      <ButtonWithAuth
        colorScheme='red'
        width='250px'
        onClick={() => logout().unwrap()}
      >
        Выйти
      </ButtonWithAuth>

    </Box>
  )
}

export default Home

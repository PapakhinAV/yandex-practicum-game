import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ERoutes } from '../../core/Router/ERoutes'
import { Button } from '../../components'
import { Box } from '@chakra-ui/react'
import { useLogoutMutation } from '../../api/auth'
import { useSelector } from 'react-redux'
import { IRootState } from '../../store/types'

import menu_ork from './assets/menu_ork.png'
import { getThemeColors } from '../../App/constants'

const Home: FC = () => {
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()
  const currentTheme = useSelector((state: IRootState) => state.app.theme)

  const user = useSelector((state: IRootState) => state.app.user)
  const isAuthenticated = !!user

  const getMenuButton = (label: string, redirectTo: string) => (
    <Button
      width='250px'
      onClick={() => navigate(redirectTo)}
    >
      {label}
    </Button>
  )

  const themeColors = getThemeColors(currentTheme)

  return (
    <Box
      display='grid'
      maxW={600}
      borderTop='2px solid #ffffff85'
      borderBottom='2px solid #00000085'
      background={`${themeColors.BACKGROUND}`}
      backdropFilter="auto"
      backdropBlur='10px'
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
      {getMenuButton('Играть', ERoutes.GAME)}
      {isAuthenticated
        ? (
          <>
            {getMenuButton('Форум', ERoutes.FORUM)}
            {getMenuButton('Профиль', ERoutes.PROFILE)}
            {getMenuButton('Таблица лидеров', ERoutes.LEADERBOARD)}
            <Button
              colorScheme='red'
              width='250px'
              onClick={() => logout().unwrap()}
            >
              Выйти
            </Button>
          </>
        ) 
        : (
          <>
            {getMenuButton('Авторизация', ERoutes.LOGIN)}
            {getMenuButton('Регистрация', ERoutes.REGISTER)}
          </>
        )
      }
    </Box>
  )
}

export default Home

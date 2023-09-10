import React, { useEffect } from 'react'
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import {
  Game,
  Home,
  ErrorPage,
  Profile,
  Leaderboard,
  Forum,
  ForumTopic,
  Login,
  Register,
} from '../../pages'
import { ERoutes } from './ERoutes'
import AppRoute from './AppRoute'
import { useGetUserQuery } from '../../api/auth'
import { useSelector } from 'react-redux'
import { IRootState } from '../../store/types'
import { Box, Spinner } from '@chakra-ui/react'
import { useOauthSigninMutation } from '../../api/oauth'
import { OAUTH_REDIRECT_URL } from '../../api/constants'

const Router = () => {
  const user = useSelector((state: IRootState) => state.app.user)
  const { refetch: refetchUser, isLoading } = useGetUserQuery(undefined, { skip: !!user })

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')
  const [oauthSignin] = useOauthSigninMutation()

  useEffect(() => {
    if (code) {
      const oauth = async () => {
        await oauthSignin({ code, redirect_uri: OAUTH_REDIRECT_URL })
        await refetchUser()
      }
      
      oauth()
      navigate(ERoutes.HOME)
    }
  }, [code])

  if (isLoading) return (
    <Box
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh" 
      width="100vw"
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        label="Загрузка"
      />
    </Box>
  )

  return (
    <Routes>
      <Route 
        path={ERoutes.HOME} 
        element={
          <AppRoute 
            element={<Home />} 
            metaInfo={{ title: 'Меню' }} 
          />
        } 
      />
      <Route 
        path={ERoutes.GAME} 
        element={
          <AppRoute 
            element={<Game />} 
            metaInfo={{ title: 'Игра' }}
          />
        } 
      />
      <Route
        path={ERoutes.LOGIN}
        element={
          <ProtectedRoute user={user} redirectPath={ERoutes.HOME} path={ERoutes.LOGIN}>
            <AppRoute element={<Login />} metaInfo={{ title: 'Авторизация' }} />
          </ProtectedRoute>
        }
      />
      <Route
        path={ERoutes.REGISTER}
        element={
          <ProtectedRoute user={user} redirectPath={ERoutes.HOME} path={ERoutes.REGISTER}>
            <AppRoute element={<Register />} metaInfo={{ title: 'Регистрация' }} />
          </ProtectedRoute>
        }
      />
      <Route
        path={ERoutes.PROFILE}
        element={
          <ProtectedRoute user={user}>
            <AppRoute element={<Profile />} metaInfo={{ title: 'Профиль' }} />
          </ProtectedRoute>
        }
      />
      <Route
        path={ERoutes.LEADERBOARD}
        element={
          <ProtectedRoute user={user}>
            <AppRoute element={<Leaderboard />} metaInfo={{ title: 'Таблица лидеров' }} />
          </ProtectedRoute>
        }
      />
      <Route
        path={ERoutes.FORUM}
        element={
          <AppRoute
            element={<Forum/>}
            metaInfo={{ title: 'Форум'}}
          />
        }
      />
      <Route
        path={ERoutes.FORUM_TOPIC}
        element={<AppRoute element={<ForumTopic />} />}
      />
      <Route
        path={ERoutes.PAGE_404}
        element={
          <AppRoute
            element={<ErrorPage />}
            metaInfo={{ title: '404' }}
          />
        }
      />
      <Route
        path={ERoutes.PAGE_500}
        element={
          <AppRoute
            element={
              <ErrorPage
                status="500"
                message="Что-то пошло не так..."
              />
            }
            metaInfo={{ title: '500' }}
          />
        }
      />
    </Routes>
  )
}

export default Router

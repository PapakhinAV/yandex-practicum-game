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
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { IRootState } from '../../store/types'
import { OAUTH_REDIRECT_URL } from '../../api/constants'
import { oauthSigninAndFetchUser } from '../../store/Thunk'
import { Loader } from '../../components'

const Router = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: IRootState) => state.app.user)
  const { isLoading } = useGetUserQuery(undefined, { skip: !!user })

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const code = searchParams.get('code')

  useEffect(() => {
    if (code) {
      dispatch(oauthSigninAndFetchUser({
        code,
        redirect_uri: OAUTH_REDIRECT_URL
      })).then(() => {
        navigate(ERoutes.HOME)
      })
    }
  }, [code])

  if (isLoading) return (
    <Loader isLoading={isLoading} />
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

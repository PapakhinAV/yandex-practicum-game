import React from 'react'
import { Route, Routes } from 'react-router-dom'
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

const Router = () => {
  const user = useSelector((state: IRootState) => state.app.user)
  const { isLoading } = useGetUserQuery()
  if (isLoading) return <>Загрузка</>
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
          <ProtectedRoute user={!user} redirectPath={ERoutes.HOME}>
            <AppRoute element={<Login />} metaInfo={{ title: 'Авторизация' }} />
          </ProtectedRoute>
        }
      />
      <Route
        path={ERoutes.REGISTER}
        element={
          <ProtectedRoute user={!user} redirectPath={ERoutes.HOME}>
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

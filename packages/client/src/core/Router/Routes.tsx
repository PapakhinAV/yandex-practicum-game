import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Game, Home, ErrorPage, Profile } from '../../pages'
import { ERoutes } from './ERoutes'
import AppRoute from './AppRoute'

export const Router = () => (
  <Routes>
    <Route path={ERoutes.HOME} element={<AppRoute element={<Home />} />} />
    <Route path={ERoutes.GAME} element={<AppRoute element={<Game />} />} />
    <Route path={ERoutes.LOGIN} element={<AppRoute element={<>LOGIN</>} />} />
    <Route
      path={ERoutes.REGISTER}
      element={<AppRoute element={<>REGISTER</>} />}
    />
    <Route
      path={ERoutes.PROFILE}
      element={
        <AppRoute element={<Profile />} metaInfo={{ title: 'Профиль' }} />
      }
    />
    <Route path={ERoutes.GAME} element={<AppRoute element={<>GAME</>} />} />
    <Route
      path={ERoutes.LEADERBOARD}
      element={<AppRoute element={<>LEADERBOARD</>} />}
    />
    <Route path={ERoutes.FORUM} element={<AppRoute element={<>FORUM</>} />} />
    <Route
      path={ERoutes.FORUM_TOPIC}
      element={<AppRoute element={<>FORUM_TOPIC</>} />}
    />
    <Route
      path={ERoutes.PAGE_404}
      element={<AppRoute element={<ErrorPage />} metaInfo={{ title: '404' }} />}
    />
    <Route
      path={ERoutes.PAGE_500}
      element={
        <AppRoute
          element={<ErrorPage status="500" message="Что-то пошло не так..." />}
          metaInfo={{ title: '500' }}
        />
      }
    />
  </Routes>
)

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Page404 } from '../pages'
import { ERoutes } from './ERoutes'

export const Router = () => (
  <Routes>
    <Route path={ERoutes.HOME} element={<Home />} />
    <Route path={ERoutes.LOGIN} element={<>LOGIN</>} />
    <Route path={ERoutes.REGISTER} element={<>REGISTER</>} />
    <Route path={ERoutes.PROFILE} element={<>PROFILE</>} />
    <Route path={ERoutes.GAME} element={<>GAME</>} />
    <Route path={ERoutes.LEADERBOARD} element={<>LEADERBOARD</>} />
    <Route path={ERoutes.FORUM} element={<>FORUM</>} />
    <Route path={ERoutes.FORUM_TOPIC} element={<>FORUM_TOPIC</>} />
    <Route path={ERoutes.PAGE_404} element={<Page404 />} />
  </Routes>
)

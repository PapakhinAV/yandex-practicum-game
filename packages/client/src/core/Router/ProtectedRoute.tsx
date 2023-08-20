import { Navigate } from 'react-router-dom'
import { ERoutes } from './ERoutes'
import { ProtectedRouteProps } from './types'

export const ProtectedRoute = ({ user, children, redirectPath = ERoutes.LOGIN, path }: ProtectedRouteProps) => {
  if (path === ERoutes.LOGIN || path === ERoutes.REGISTER) {
    return user ?  <Navigate to={redirectPath} replace /> : children
  }

  return !user ?  <Navigate to={redirectPath} replace /> : children
}

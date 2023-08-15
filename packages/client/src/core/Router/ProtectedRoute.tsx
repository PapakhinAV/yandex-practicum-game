import { Navigate } from 'react-router-dom'
import { ERoutes } from './ERoutes'
import { ProtectedRouteProps } from './types'

export const ProtectedRoute = ({ isAuth, children, redirectPath = ERoutes.LOGIN }: ProtectedRouteProps) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}

import { Navigate } from 'react-router-dom'
import { ERoutes } from './ERoutes'
import { ProtectedRouteProps } from './types'

export const ProtectedRoute = ({ user, children, redirectPath = ERoutes.LOGIN }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return children
}

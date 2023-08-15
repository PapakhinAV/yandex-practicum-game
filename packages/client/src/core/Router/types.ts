import { ReactElement } from 'react'

export type MetaInfo = {
  title: string
  description?: string
}

export type AppRouteProps = {
  metaInfo?: MetaInfo
  element: ReactElement
}

export type ProtectedRouteProps = {
  isAuth: boolean
  children: ReactElement
  redirectPath?: string 
}

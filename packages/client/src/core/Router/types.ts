import { ReactElement } from 'react'
import { IUserState } from '../../store/types'

export type MetaInfo = {
  title: string
  description?: string
}

export type AppRouteProps = {
  metaInfo?: MetaInfo
  element: ReactElement
}

export type ProtectedRouteProps = {
  user: IUserState | null
  children: ReactElement
  redirectPath?: string 
  path?: string
}

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
  user: IUserState | null | boolean
  children: ReactElement
  redirectPath?: string 
}

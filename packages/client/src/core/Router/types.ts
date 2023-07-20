import { ReactElement } from 'react'

export type MetaInfo = {
  title: string
  description: string
}

export type AppRouteProps = {
  metaInfo?: MetaInfo
  element: ReactElement
}

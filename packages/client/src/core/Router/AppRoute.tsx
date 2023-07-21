import { FC } from 'react'
import { Helmet } from 'react-helmet-async'
import { ErrorBoundary } from 'react-error-boundary'
import { AppRouteProps } from './types'
import ErrorFallback from '../ErrorFallback/ErrorFallback'

const AppRoute: FC<AppRouteProps> = ({ element, metaInfo }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Helmet>
        {metaInfo?.title && <title>{metaInfo.title}</title>}
        {metaInfo?.description && (
          <meta name="description" content={metaInfo.description} />
        )}
      </Helmet>
      {element}
    </ErrorBoundary>
  )
}

export default AppRoute

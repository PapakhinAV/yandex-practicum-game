import { FC } from 'react'
import styles from './ErrorPage.module.scss'
import { Link } from 'react-router-dom'
import { type ErrorPageProps } from './types'
import { ERoutes } from '../../core/Router/ERoutes'
import { Helmet } from 'react-helmet-async'

const ErrorPage: FC<ErrorPageProps> = ({
  status = '404',
  message = 'Не туда попали',
}) => {
  return (
    <>
      <Helmet>
        <title>Error</title>
      </Helmet>
      <div className={styles.error__wrapper}>
        <div className={styles.error__status}>{status}</div>
        <div className={styles.error__message}>{message}</div>
        <Link to={ERoutes.HOME}>Назад в меню</Link>
      </div>
    </>
  )
}

export default ErrorPage

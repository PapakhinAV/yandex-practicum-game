import React from 'react'
import { Link } from 'react-router-dom'
import { ERoutes } from '../../core/Router/ERoutes'

const Page404 = () => {
  return (
    <div>
      <h2>404</h2>
      <Link to={ERoutes.HOME}>Home</Link>
    </div>
  )
}

export default Page404

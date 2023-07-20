import React from 'react'
import { Link } from 'react-router-dom'
import { ERoutes } from '../../core/ERoutes'

const Home = () => {
  return (
    <div>
      <h2>Вот тут будет жить ваше приложение :)</h2>
      <ul>
        <li>
          <Link to={ERoutes.LOGIN}>Login</Link>
        </li>
        <li>
          <Link to='/404'>404</Link>
        </li>
      </ul>
    </div>
      )
}

export default Home

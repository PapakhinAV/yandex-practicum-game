import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from './Login'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from '../../store/store'

const title = 'Вход'

describe('Компонент Agpp', () => {
  const defaultStore = { ...store }
  test('Отображает страницу логина', () => {
    render(
      <Provider store={defaultStore}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    )
    screen.debug()

    const loginPageElement = screen.getByText(title)
    expect(loginPageElement).toBeInTheDocument()
  })
})



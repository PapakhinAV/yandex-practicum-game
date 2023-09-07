import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Login from './Login'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import store from '../../store/store'

const title = 'Вход'

describe('Компонент Login', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve('hey'),
      })
    )
  })

  const defaultStore = { ...store }
  test('рендерится', () => {
    render(
      <Provider store={defaultStore}>
        <MemoryRouter>
          <Login/>
        </MemoryRouter>
      </Provider>
    )
    // screen.debug()

    const loginPageTitle = screen.getByText(title)
    expect(loginPageTitle).toBeInTheDocument()
  })
})

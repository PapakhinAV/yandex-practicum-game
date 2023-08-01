import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from '../store/store'

const homeContent = 'Загрузка'

describe('Компонент App', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve('hey'),
      })
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Отображает главную страницу', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    )

    const homePageElement = screen.getByText(homeContent)
    expect(homePageElement).toBeInTheDocument()
  })
})

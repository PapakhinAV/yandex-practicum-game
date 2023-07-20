import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '@testing-library/jest-dom/extend-expect'

const homeContent = 'Вот тут будет жить ваше приложение :)'

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
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    const homePageElement = screen.getByText(homeContent)
    expect(homePageElement).toBeInTheDocument()
  })
})

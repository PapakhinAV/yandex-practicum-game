import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import NavButton from './NavButton'
import { ENavButtonDirection } from './types'
import { ERoutes } from '../../core/Router/ERoutes'
import { MemoryRouter } from 'react-router-dom'

const mockHistoryNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockHistoryNavigate
}))

describe('Компонент NavButton', () => {
  test('рендерится', () => {
    render(
      <MemoryRouter>
        <NavButton direction={ENavButtonDirection.HOME}/>
      </MemoryRouter>
    )
    const navButton = screen.getByRole('button')
    expect(navButton).toBeInTheDocument()
  })

  test('перенаправляет по клику на главную страницу', () => {
    render(
      <MemoryRouter>
        <NavButton direction={ENavButtonDirection.HOME}/>
      </MemoryRouter>
    )

    const navButton = screen.getByRole('button')
    fireEvent.click(navButton)
    expect(mockHistoryNavigate).toHaveBeenCalledWith(ERoutes.HOME)
  })

  test('перенаправляет по клику назад', () => {
    render(
      <MemoryRouter>
        <NavButton direction={ENavButtonDirection.BACK}/>
      </MemoryRouter>
    )

    const navButton = screen.getByRole('button')
    fireEvent.click(navButton)
    expect(mockHistoryNavigate).toHaveBeenCalledWith(-1)
  })

  test('перенаправляет по клику на заданную страницу', () => {
    const customPath = 'test-custom-path'
    render(
      <MemoryRouter>
        <NavButton customRoute={customPath} direction={ENavButtonDirection.CUSTOM}/>
      </MemoryRouter>
    )

    const navButton = screen.getByRole('button')
    fireEvent.click(navButton)
    expect(mockHistoryNavigate).toHaveBeenCalledWith(customPath)
  })
})

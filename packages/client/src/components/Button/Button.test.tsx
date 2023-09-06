import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from './Button'

const buttonContent = 'Кнопка'

describe('Компонент Button', () => {
  test('рендерится', () => {
    render(<Button>{buttonContent}</Button>)
    const renderedButton = screen.getByRole('button')
    expect(renderedButton).toBeInTheDocument()
  })

  test('устанавливает переданный класс css', () => {
    const buttonTestCSSClass = 'button-test-css-class'
    render(<Button className={buttonTestCSSClass}>{buttonContent}</Button>)

    const renderedButton = screen.getByRole('button')
    expect(renderedButton).toHaveClass(buttonTestCSSClass)
  })

  test('рендерится в состоянии disabled', () => {
    render(<Button disabled>{buttonContent}</Button>)
    const renderedButton = screen.getByRole('button')
    expect(renderedButton).toBeDisabled
  })

  test('вызывает по клику переданную функцию', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>{buttonContent}</Button>)

    fireEvent.click(screen.getByText(buttonContent))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})

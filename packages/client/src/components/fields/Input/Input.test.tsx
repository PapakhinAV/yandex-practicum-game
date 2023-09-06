import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Input from './Input'

const inputTestId = 'inputTestId'

describe('Компонент Input', () => {
  test('рендерится', () => {
    render(<Input data-testid={inputTestId}/>)
    const renderedInput = screen.getByTestId(inputTestId)
    expect(renderedInput).toBeInTheDocument()
  })

  test('устанавливает переданное значение класса css', () => {
    const inputTestCSSClass = 'input-test-css-class'
    render(<Input className={inputTestCSSClass} data-testid={inputTestId}/>)

    const renderedInput = screen.getByTestId(inputTestId)
    expect(renderedInput).toHaveClass(inputTestCSSClass)
  })

  test('устанавливает переданные атрибуты', () => {
    const attrinutes = {
      id: 'test-id',
      type: 'password'
    }

    render(<Input 
      data-testid={inputTestId}
      id={attrinutes.id}
      type={attrinutes.type}
    />)
    
    const renderedInput = screen.getByTestId(inputTestId)

    expect(renderedInput).toHaveAttribute('id', attrinutes.id)
    expect(renderedInput).toHaveAttribute('type', attrinutes.type)
  })
})

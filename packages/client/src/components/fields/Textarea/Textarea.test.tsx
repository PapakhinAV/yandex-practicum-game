import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Textarea from './Textarea'

const textareaTestId = 'textareaTestId'

describe('Компонент Textarea', () => {
  test('рендерится', () => {
    render(<Textarea data-testid={textareaTestId}/>)
    const renderedTextarea = screen.getByTestId(textareaTestId)
    expect(renderedTextarea).toBeInTheDocument()
  })

  test('устанавливает переданное значение класса css', () => {
    const textareaTestCSSClass = 'textarea-test-css-class'
    render(<Textarea className={textareaTestCSSClass} data-testid={textareaTestId}/>)

    const renderedTextarea = screen.getByTestId(textareaTestId)
    expect(renderedTextarea).toHaveClass(textareaTestCSSClass)
  })

  test('устанавливает переданные атрибуты', () => {
    const attrinutes = {
      id: 'test-id',
      name: 'test-name'
    }

    render(<Textarea
      data-testid={textareaTestId}
      id={attrinutes.id}
      name={attrinutes.name}
    />)

    const renderedTextarea = screen.getByTestId(textareaTestId)

    expect(renderedTextarea).toHaveAttribute('id', attrinutes.id)
    expect(renderedTextarea).toHaveAttribute('name', attrinutes.name)
  })
})

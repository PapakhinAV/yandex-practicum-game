import { act, renderHook } from '@testing-library/react'
import { useMousePosition } from './index'

describe('useMousePosition', () => {
  it('Возвращает обновлённые данные о координатах курсора при его перемещении', () => {
    const canvasMock = {
      current: {
        getBoundingClientRect: () => ({
          top: 0,
          left: 0,
          bottom: 100,
          right: 100,
          width: 100,
          height: 100,
        }),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }
    } as any

    const { result } = renderHook(() => useMousePosition(canvasMock))
    const { mouse } = result.current

    expect(mouse).toEqual({ x: 0, y: 0 })

    const mockMouseEvent = new MouseEvent('mousemove', {
      clientX: 50,
      clientY: 50
    })

    act(() => {
      const eventListener = canvasMock.current.addEventListener.mock.calls[0][1]
      eventListener(mockMouseEvent)
    })

    expect(result.current.mouse).toEqual({ x: 50, y: 50 })
  })
})

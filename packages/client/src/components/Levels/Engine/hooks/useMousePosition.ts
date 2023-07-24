import { useEffect, useRef, useState } from 'react'
import { IPosition } from '../types'

const useMousePosition = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const initialValue = { x: 0, y: 0 }
  const [mouse, setMouse] = useState<IPosition>(initialValue)
  const mouseRef = useRef<IPosition>(initialValue)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateMousePosition = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const newMousePosition = { x, y }
      setMouse(newMousePosition)
      mouseRef.current = newMousePosition
    }

    canvas.addEventListener('mousemove', updateMousePosition)

    return () => {
      canvas.removeEventListener('mousemove', updateMousePosition)
    }
  }, [canvasRef])

  return { mouse, mouseRef }
}

export default useMousePosition

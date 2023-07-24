import React, { useEffect, useRef } from 'react'
import { Placement } from '../AbstractClasses/Placement'
import { tileSize, towerSize } from '../baseConstants'

const useActiveTile = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  placementTiles: Placement[]
) => {
  const activeTile = useRef<Placement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateActiveTile = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      activeTile.current = null
      for (let i = 0; i < placementTiles.length; i++) {
        const tile = placementTiles[i]
        if (
          x > tile.position.x &&
          x < tile.position.x + towerSize &&
          y > tile.position.y &&
          y < tile.position.y + tileSize
        ) {
          activeTile.current = tile
          break
        }
      }
    }

    canvas.addEventListener('mousemove', updateActiveTile)

    return () => {
      canvas.removeEventListener('mousemove', updateActiveTile)
    }
  }, [canvasRef])

  return { activeTileRef: activeTile }
}

export default useActiveTile

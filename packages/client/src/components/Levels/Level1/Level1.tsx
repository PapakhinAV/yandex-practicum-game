import React, { useEffect, useRef } from 'react'
import { FC } from 'react'
import map from './img/map.png'
import { level1Placements, level1WayPoints } from './constants'
import { createEnemies, animateCanvasWrapper } from '../Engine'
import useMousePosition from '../Engine/hooks/useMousePosition'
import usePlacementTiles from '../Engine/hooks/usePlacementTiles'
import { canvasHeight, canvasWidth } from '../Engine/baseConstants'

const Level1: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { placementTiles } = usePlacementTiles(level1Placements)
  const { mouseRef } = useMousePosition(canvasRef)
  const background = new Image()

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    const enemies = createEnemies(10, level1WayPoints, 150)
    const buildings = []

    if (canvas) {
      canvas.width = canvasWidth
      canvas.height = canvasHeight
    }

    if (context) {
      background.src = map
      background.onload = () => {
        animateCanvasWrapper({
          context,
          background,
          placementTiles,
          enemies,
          mouseRef,
        })
      }
    }
  }, [])

  return <canvas ref={canvasRef} />
}

export default Level1

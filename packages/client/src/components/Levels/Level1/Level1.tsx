import React, { useEffect, useRef } from 'react'
import { FC } from 'react'
import map from './img/map.png'
import { level1Placements, level1WayPoints } from './constants'
import {
  createEnemies,
  animateCanvasWrapper,
  handlerCanvasClick,
  Building,
  useActiveTile,
  useMousePosition,
  usePlacementTiles,
  canvasHeight,
  canvasWidth,
} from '../Engine'

const Level1: FC = () => {
  const buildingsRef = useRef<Building[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { placementTiles } = usePlacementTiles(level1Placements)
  const { activeTileRef } = useActiveTile(canvasRef, placementTiles)
  const { mouseRef } = useMousePosition(canvasRef)
  const background = new Image()

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    const enemies = createEnemies(10, level1WayPoints, 150)

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
          buildingsRef,
          enemies,
          mouseRef,
        })
      }
    }
  }, [])

  return (
    <canvas
      onClick={() => handlerCanvasClick(activeTileRef, buildingsRef)}
      ref={canvasRef}
    />
  )
}

export default Level1

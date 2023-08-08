import React, { memo, useEffect, useRef } from 'react'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { newGame } from '../../pages/Game/gameSlice'
import { useCanvasClickBuilder, useStartGame } from '../../GameEngine'
import { level1Placements, level1WayPoints } from './constants'
import map from './img/map.png'
import { OrkTower } from '../../GameEngine/GameElements'

const Level: FC = () => {
  const dispatch = useDispatch()
  const hearts = useRef<number>(5)

  useEffect(() => {
    dispatch(newGame({ hearts: hearts.current, coins: 30 }))
  }, [])

  const { canvasRef, activeTileRef, buildingsRef } = useStartGame({
    hearts: hearts,
    gameParams: {
      levelPlacements: level1Placements,
      levelWayPoints: level1WayPoints,
      map,
    },
  })

  const canvasClickHandler = useCanvasClickBuilder(
    activeTileRef,
    buildingsRef,
    OrkTower
  )

  return <canvas onClick={canvasClickHandler} ref={canvasRef} />
}

export default memo(Level)

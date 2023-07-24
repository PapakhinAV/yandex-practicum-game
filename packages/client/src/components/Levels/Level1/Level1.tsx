import React, { memo, useEffect, useRef } from 'react'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { newGame, setHearts } from '../../../pages/Game/gameSlice'
import { useCanvasClickHandler, useStartGame } from '../Engine'
import { enemyWavesLevel1, level1Placements } from './constants'
import map from './img/map.png'
import { Tower } from '../Engine/Towers/Tower'

const Level1: FC = () => {
  const dispatch = useDispatch()
  const hearts = useRef<number>(2)

  useEffect(() => {
    dispatch(newGame({ hearts: hearts.current, coins: 30 }))
  }, [])

  const handlerHeartsChange = (newValue: number): void => {
    hearts.current = newValue
    dispatch(setHearts(newValue))
  }

  const { canvasRef, activeTileRef, buildingsRef, enemiesRef } = useStartGame({
    hearts: hearts,
    onHeartsChange: handlerHeartsChange,
    gameParams: {
      enemyWaves: enemyWavesLevel1,
      levelPlacements: level1Placements,
      map,
    },
  })

  const canvasClickHandler = useCanvasClickHandler(
    activeTileRef,
    buildingsRef,
    enemiesRef,
    Tower
  )

  return <canvas onClick={canvasClickHandler} ref={canvasRef} />
}

export default memo(Level1)

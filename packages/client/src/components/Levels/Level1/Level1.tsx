import React, { memo, useEffect, useRef, useState } from 'react'
import { FC } from 'react'
import map from './img/map.png'
import { enemyWavesLevel1, level1Placements } from './constants'
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
  Enemy,
} from '../Engine'
import styles from './Level1.module.scss'
import { Heading } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getHearts, newGame, setHearts } from '../../../pages/Game/gameSlice'

const Level1: FC = () => {
  const dispatch = useDispatch()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const buildingsRef = useRef<Building[]>([])
  const hearts = useRef<number>(2)
  const heartsFromStore = useSelector(getHearts)
  const waves = [...enemyWavesLevel1]
  const wave = waves.shift()
  const enemiesRef = useRef<Enemy[]>(wave ? createEnemies(wave) : [])

  const { placementTiles } = usePlacementTiles(level1Placements)
  const { activeTileRef } = useActiveTile(canvasRef, placementTiles)
  const { mouseRef } = useMousePosition(canvasRef)

  const background = new Image()

  const handlerHeartsChange = (newValue: number): void => {
    hearts.current = newValue
    dispatch(setHearts(newValue))
  }

  useEffect(() => {
    dispatch(newGame({ hearts: hearts.current }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

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
          enemiesRef,
          mouseRef,
          waves,
          hearts,
          setHearts: handlerHeartsChange,
        })
      }
    }
  }, [])

  return (
    <div className={styles.level1__wrapper}>
      <canvas
        onClick={() =>
          handlerCanvasClick(activeTileRef, buildingsRef, enemiesRef)
        }
        ref={canvasRef}
      />
      {!heartsFromStore && (
        <Heading className={styles.level1__endGame}>Game Over</Heading>
      )}
    </div>
  )
}

export default memo(Level1)

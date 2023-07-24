import React, { memo, useEffect, useRef } from 'react'
import { FC } from 'react'
import styles from './Level1.module.scss'
import { Heading } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getHearts, newGame, setHearts } from '../../../pages/Game/gameSlice'
import { handlerCanvasClick, useStartGame } from '../Engine'
import { enemyWavesLevel1, level1Placements } from './constants'
import map from './img/map.png'

const Level1: FC = () => {
  const dispatch = useDispatch()
  const heartsFromStore = useSelector(getHearts)
  const hearts = useRef<number>(2)

  useEffect(() => {
    dispatch(newGame({ hearts: hearts.current }))
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

  return (
    <div className={styles.level1__wrapper}>
      <div>
        <span>Lives: </span>
        <span>{heartsFromStore}</span>
      </div>
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

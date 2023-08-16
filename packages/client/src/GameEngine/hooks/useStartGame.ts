import { MutableRefObject, useEffect, useRef } from 'react'
import {
  createEnemies,
  Building,
  useActiveTile,
  useMousePosition,
  usePlacementTiles,
  canvasHeight,
  canvasWidth,
  Enemy, useAnimateCanvas, generateSimpleWaves
} from '../index'
import { ICreateEnemyOptions, IPosition } from '../types'
import {
  addCoins,
  addScore,
  setHearts,
  updateStatus,
  EGameStatus
} from '../../pages/Game/gameSlice'
import { batch, useDispatch } from 'react-redux'

export interface IStartGameOptions {
  hearts: MutableRefObject<number>
  gameParams: {
    map: string
    enemyWaves?: ICreateEnemyOptions[]
    levelWayPoints: IPosition[]
    levelPlacements: number[]
  }
}


const useStartGame = (props: IStartGameOptions) => {
  const dispatch = useDispatch()

  const { hearts, gameParams } = props
  const { map, enemyWaves, levelPlacements, levelWayPoints } = gameParams

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const buildingsRef = useRef<Building[]>([])
  const waves = enemyWaves ? [...enemyWaves] : generateSimpleWaves( 100, 3, levelWayPoints)
  const wave =  waves.shift()
  const enemiesRef = useRef<Enemy[]>(wave ? createEnemies(wave) : [])
  const { placementTiles } = usePlacementTiles(levelPlacements)
  const { mouseRef } = useMousePosition(canvasRef)
  const { activeTileRef } = useActiveTile(mouseRef, placementTiles)
  const background = new Image()
  const onHeartsChange = (newValue: number): void => {
    hearts.current = newValue
    if (newValue <= 0) {
      batch(() => {
        dispatch(setHearts(newValue))
        dispatch(updateStatus(EGameStatus.GAME_OVER))
      })
    } else {
      dispatch(setHearts(newValue))
    }
  }

  const onEnemyDefeated = (coins: number, scorePoints: number): void => {
    batch(() => {
      dispatch(addCoins(coins))
      dispatch(addScore(scorePoints))
    })
  }

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
        useAnimateCanvas({
          context,
          background,
          placementTiles,
          buildingsRef,
          enemiesRef,
          mouseRef,
          waves,
          hearts,
          setHearts: onHeartsChange,
          onEnemyDefeated,
        })
      }
    }
  }, [])

  return { canvasRef, activeTileRef, buildingsRef, enemiesRef }
}

export default useStartGame

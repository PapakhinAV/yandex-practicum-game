import { MutableRefObject, useEffect, useRef } from 'react'
import {
  createEnemies,
  animateCanvasWrapper,
  Building,
  useActiveTile,
  useMousePosition,
  usePlacementTiles,
  canvasHeight,
  canvasWidth,
  Enemy,
} from '../index'
import { ICreateEnemyOptions } from '../types'
import { addCoins, addScore, setHearts } from '../../pages/Game/gameSlice'
import { batch, useDispatch } from 'react-redux'

export interface IStartGameOptions {
  hearts: MutableRefObject<number>
  gameParams: {
    map: string
    enemyWaves: ICreateEnemyOptions[]
    levelPlacements: number[]
  }
}


const useStartGame = (props: IStartGameOptions) => {
  const dispatch = useDispatch()

  const { hearts, gameParams } = props
  const { map, enemyWaves, levelPlacements } = gameParams

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const buildingsRef = useRef<Building[]>([])
  const waves = [...enemyWaves]
  const wave = waves.shift()
  const enemiesRef = useRef<Enemy[]>(wave ? createEnemies(wave) : [])
  const { placementTiles } = usePlacementTiles(levelPlacements)
  const { mouseRef } = useMousePosition(canvasRef)
  const { activeTileRef } = useActiveTile(mouseRef, placementTiles)
  const background = new Image()

  const onHeartsChange = (newValue: number): void => {
    hearts.current = newValue
    dispatch(setHearts(newValue))
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
        animateCanvasWrapper({
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

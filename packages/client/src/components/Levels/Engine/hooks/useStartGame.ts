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
} from '../'
import { ICreateEnemyOptions } from '../types'

export interface IStartGameOptions {
  hearts: MutableRefObject<number>
  onHeartsChange: (newValue: number) => void
  onEnemyDefeated: (newValue: number) => void
  gameParams: {
    map: string
    enemyWaves: ICreateEnemyOptions[]
    levelPlacements: number[]
  }
}

const useStartGame = (props: IStartGameOptions) => {
  const { hearts, onHeartsChange, gameParams, onEnemyDefeated } = props
  const { map, enemyWaves, levelPlacements } = gameParams

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const buildingsRef = useRef<Building[]>([])
  const waves = [...enemyWaves]
  const wave = waves.shift()
  const enemiesRef = useRef<Enemy[]>(wave ? createEnemies(wave) : [])
  const { placementTiles } = usePlacementTiles(levelPlacements)
  const { activeTileRef } = useActiveTile(canvasRef, placementTiles)
  const { mouseRef } = useMousePosition(canvasRef)
  const background = new Image()

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
          onEnemyDefeated: onEnemyDefeated,
        })
      }
    }
  }, [])

  return { canvasRef, activeTileRef, buildingsRef, enemiesRef }
}

export default useStartGame

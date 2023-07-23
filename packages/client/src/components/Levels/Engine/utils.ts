import { IAnimateCanvasParams, IEnemy, IPosition } from './types'
import { Enemy } from './Enemy'
import { collsOnMap } from './baseConstants'
import { Placement } from './Placement'

export const createEnemies = (
  quantity: number,
  levelPoints: IPosition[],
  gap = 100
): IEnemy[] => {
  const enemies: IEnemy[] = []

  for (let i = 0; i < quantity; i++) {
    const xOffset = i * gap
    enemies.push(new Enemy(levelPoints, xOffset))
  }
  return enemies
}

export const transformPlacementTo2D = (
  data: number[],
  chunkSize = collsOnMap
) => {
  const array2D = []

  for (let i = 0; i < data.length; i += chunkSize) {
    array2D.push(data.slice(i, i + chunkSize))
  }
  return array2D
}

export const animateCanvasWrapper = (params: IAnimateCanvasParams) => {
  const animationFrameCallback = () => animateCanvas(params)
  requestAnimationFrame(animationFrameCallback)
}

const animateCanvas = (params: IAnimateCanvasParams) => {
  const { context, background, placementTiles, enemies, mouseRef } = params

  if (context) {
    context.drawImage(background, 0, 0)
    enemies.forEach(enemy => enemy.update(context))
    placementTiles.forEach(tile => {
      tile.update(context, mouseRef.current)
    })

    animateCanvasWrapper(params)
  }
}

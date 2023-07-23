import { IBuildingOptions, IPosition } from './types'
import { tileSize, towerSize } from './baseConstants'

export class Building {
  position: IPosition
  width: number

  constructor({ position = { x: 0, y: 0 } }: IBuildingOptions) {
    this.position = position
    this.width = towerSize
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'blue'
    context.fillRect(this.position.x, this.position.y, this.width, tileSize)
  }
}

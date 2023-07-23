import { IBuildingOptions, IPosition } from './types'
import { titleSize } from './baseConstants'

export class Building {
  position: IPosition

  constructor({ position = { x: 0, y: 0 } }: IBuildingOptions) {
    this.position = position
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'blue'
    context.fillRect(this.position.x, this.position.y, titleSize, titleSize)
  }
}

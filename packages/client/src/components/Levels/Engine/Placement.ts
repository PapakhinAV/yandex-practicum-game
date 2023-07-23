import { IPlacementOptions, IPosition } from './types'
import { titleSize } from './baseConstants'

export class Placement {
  position: IPosition
  size: number
  color: string

  constructor({ position = { x: 0, y: 0 } }: IPlacementOptions) {
    this.position = position
    this.size = titleSize
    this.color = 'rgba(255,255,255,0.15)'
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color
    context.fillRect(this.position.x, this.position.y, this.size * 2, this.size)
  }

  update(context: CanvasRenderingContext2D, mouse: IPosition) {
    this.draw(context)

    if (
      mouse.x > this.position.x &&
      mouse.x < this.position.x + this.size * 2 &&
      mouse.y > this.position.y &&
      mouse.y < this.position.y + this.size
    ) {
      this.color = 'white'
    } else this.color = 'rgba(255,255,255,0.15)'
  }
}

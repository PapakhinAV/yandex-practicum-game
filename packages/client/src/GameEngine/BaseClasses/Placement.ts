import { IPlacementOptions, IPosition } from '../types'
import { tileSize, towerSize } from '../baseConstants'
import { EColors } from '../../App/constants'

export class Placement {
  position: IPosition
  size: number
  color: string
  occupied: boolean

  constructor({ position = { x: 0, y: 0 } }: IPlacementOptions) {
    this.position = position
    this.size = tileSize
    this.color = 'rgba(255,255,255,0.15)'
    this.occupied = false
    this.draw = this.draw.bind(this)
    this.update = this.update.bind(this)
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color
    context.fillRect(this.position.x, this.position.y, towerSize, this.size)
  }

  update(context: CanvasRenderingContext2D, mouse: IPosition) {
    this.draw(context)

    if (
      mouse.x > this.position.x
      && mouse.x < this.position.x + towerSize
      && mouse.y > this.position.y
      && mouse.y < this.position.y + this.size
    ) {
      this.color = EColors.WHITE
    } else this.color = 'rgba(255,255,255,0.15)'
  }
}

import { IPlacementOptions, IPosition } from '../types'
import { tileSize, towerSize } from '../baseConstants'
import { EColors } from '../../App/constants'

export class Placement {
  position: IPosition
  size: number
  color: string
  occupied: boolean
  image: HTMLImageElement
  imgPath: string
  imgHoverPath: string

  constructor({ 
    position = { x: 0, y: 0 },
    imgPath = '',
    imgHoverPath = '',
  }: IPlacementOptions) {
    this.position = position
    this.size = tileSize
    this.color = 'rgba(255,255,255,0.15)'
    this.occupied = false
    this.draw = this.draw.bind(this)
    this.update = this.update.bind(this)
    this.image = new Image()
    this.image.src = imgPath
    this.imgPath = imgPath
    this.imgHoverPath = imgHoverPath
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.occupied) {
      return
    }

    if (this.imgPath) {
      context.drawImage(this.image, this.position.x, this.position.y)
      return
    }
    context.fillStyle = this.color
    context.fillRect(this.position.x, this.position.y, towerSize, this.size)
  }

  update(context: CanvasRenderingContext2D, mouse: IPosition) {
    this.draw(context)

    if (this.occupied) {
      return
    }

    if (
      mouse.x > this.position.x
      && mouse.x < this.position.x + towerSize
      && mouse.y > this.position.y
      && mouse.y < this.position.y + this.size
    ) {
      if (this.imgHoverPath) {
        this.image.src = this.imgHoverPath
      }
      this.color = EColors.PLACEMENT_FILL
    } else {
      if (this.imgPath) {
        this.image.src = this.imgPath
      }
      this.color = 'rgba(255,255,255,0.15)'
    }
  }
}

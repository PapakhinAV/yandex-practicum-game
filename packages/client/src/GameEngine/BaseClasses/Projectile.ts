import { IPosition, IProjectileOptions } from '../types'
import { Enemy } from './Enemy'
import { EColors } from '../../App/constants'

export class Projectile {
  position: IPosition
  velocity: IPosition
  enemy: Enemy
  radius: number
  speed: number
  power: number
  image: HTMLImageElement
  imgPath: string

  constructor({
    position = { x: 0, y: 0 },
    enemy,
    speed = 10,
    power = 20,
    imgPath = '',
  }: IProjectileOptions) {
    this.position = position
    this.velocity = { x: 0, y: 0 }
    this.enemy = enemy
    this.radius = 10
    this.draw = this.draw.bind(this)
    this.update = this.update.bind(this)
    this.speed = speed
    this.power = power
    this.image = new Image()
    this.image.src = imgPath
    this.imgPath = imgPath
  }

  draw(context: CanvasRenderingContext2D) {
    if (this.imgPath) {
      context.drawImage(this.image, this.position.x, this.position.y)
      return
    }
    context.beginPath()
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    context.fillStyle = EColors.ORANGE
    context.fill()
  }

  update(context: CanvasRenderingContext2D) {
    this.draw(context)

    const yDistance = this.enemy.center.y - this.position.y
    const xDistance = this.enemy.center.x - this.position.x
    const angle = Math.atan2(yDistance, xDistance)
    this.velocity.x = Math.cos(angle) * this.speed
    this.velocity.y = Math.sin(angle) * this.speed

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

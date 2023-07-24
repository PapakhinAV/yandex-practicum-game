import { IPosition, IProjectileOptions } from '../types'
import { Enemy } from './Enemy'

export class Projectile {
  position: IPosition
  velocity: IPosition
  enemies: Enemy[]
  enemy: Enemy
  radius: number
  speed: number
  power: number

  constructor({
    position = { x: 0, y: 0 },
    enemiesRef,
    enemy,
    speed = 10,
    power = 20,
  }: IProjectileOptions) {
    this.position = position
    this.velocity = { x: 0, y: 0 }
    this.enemies = enemiesRef.current
    this.enemy = enemy
    this.radius = 10
    this.draw = this.draw.bind(this)
    this.update = this.update.bind(this)
    this.speed = speed
    this.power = power
  }

  draw(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    context.fillStyle = 'orange'
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

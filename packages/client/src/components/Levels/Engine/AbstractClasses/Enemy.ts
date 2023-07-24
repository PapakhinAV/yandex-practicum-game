import { IEnemy, IEnemyOptions, IPosition } from '../types'
import { tileSize } from '../baseConstants'
import { healthToPixels } from '../utils'

export class Enemy implements IEnemy {
  waypoints: IPosition[]
  position: IPosition
  width: number
  height: number
  radius: number
  wayPointIndex: number
  center: IPosition
  health: number
  fullHealth: number
  speed: number
  velocity: IPosition
  constructor({ waypoints, gap = 0, health = 100, speed = 1 }: IEnemyOptions) {
    this.waypoints = waypoints
    this.position = { x: waypoints[0].x - gap, y: waypoints[0].y }
    this.width = tileSize
    this.height = tileSize
    this.radius = 30
    this.wayPointIndex = 1
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    }
    this.fullHealth = health
    this.health = health
    this.speed = speed
    this.velocity = { x: 0, y: 0 }
    this.draw = this.draw.bind(this)
    this.update = this.update.bind(this)
  }
  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'red'
    // context.fillRect(this.position.x, this.position.y, this.width, this.height)
    context.beginPath()
    context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
    context.fill()

    //health bar
    context.fillStyle = 'red'
    context.fillRect(this.position.x, this.position.y - 15, this.width, 10)

    context.fillStyle = 'green'
    context.fillRect(
      this.position.x,
      this.position.y - 15,
      healthToPixels(this.health, this.fullHealth, this.width),
      10
    )
  }
  update(context: CanvasRenderingContext2D) {
    this.draw(context)

    const waypoint = this.waypoints[this.wayPointIndex]
    const yDistance = waypoint.y - this.center.y
    const xDistance = waypoint.x - this.center.x
    const angle = Math.atan2(yDistance, xDistance)

    this.velocity.x = Math.cos(angle) * this.speed
    this.velocity.y = Math.sin(angle) * this.speed

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    }

    if (
      Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) <
        Math.abs(this.velocity.x) &&
      Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) <
        Math.abs(this.velocity.y) &&
      this.wayPointIndex < this.waypoints.length - 1
    ) {
      this.wayPointIndex++
    }
  }
}

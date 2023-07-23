import { IEnemy, IPosition } from './types'
import { titleSize } from './baseConstants'

export class Enemy implements IEnemy {
  waypoints: IPosition[]
  position: IPosition
  width: number
  height: number
  wayPointIndex: number
  center: IPosition
  constructor(waypoints: IPosition[], gap = 0) {
    this.waypoints = waypoints
    this.position = { x: waypoints[0].x - gap, y: waypoints[0].y }
    this.width = titleSize
    this.height = titleSize
    this.wayPointIndex = 1
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    }
    this.draw = this.draw.bind(this)
    this.update = this.update.bind(this)
  }
  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'red'
    context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
  update(context: CanvasRenderingContext2D) {
    this.draw(context)

    const waypoint = this.waypoints[this.wayPointIndex]
    const yDistance = waypoint.y - this.center.y
    const xDistance = waypoint.x - this.center.x
    const angle = Math.atan2(yDistance, xDistance)
    this.position.x += Math.cos(angle)
    this.position.y += Math.sin(angle)
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    }

    if (
      Math.round(this.center.x) === Math.round(waypoint.x) &&
      Math.round(this.center.y) === Math.round(waypoint.y) &&
      this.wayPointIndex < this.waypoints.length - 1
    ) {
      this.wayPointIndex++
    }
  }
}

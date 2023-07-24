import { IBuildingOptions, IPosition } from '../types'
import { tileSize, towerSize } from '../baseConstants'
import { Projectile } from './Projectile'
import { Enemy } from './Enemy'
import React from 'react'

export class Building {
  position: IPosition
  width: number
  height: number
  center: IPosition
  projectiles: Projectile[]
  radius: number
  target: Enemy | null
  frames: number
  enemiesRef: React.MutableRefObject<Enemy[]>

  constructor({ position = { x: 0, y: 0 }, enemiesRef }: IBuildingOptions) {
    this.position = position
    this.width = towerSize
    this.height = tileSize
    this.center = {
      x: this.position.x + this.width / 2,
      y: this.position.y + this.height / 2,
    }
    this.projectiles = []
    this.radius = 250
    this.draw = this.draw.bind(this)
    this.target = null
    this.frames = 0
    this.enemiesRef = enemiesRef
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = 'blue'
    context.fillRect(this.position.x, this.position.y, this.width, tileSize)

    context.beginPath()
    context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
    context.fillStyle = 'rgba(0,0,255, 0.1)'
    context.fill()
  }

  update(context: CanvasRenderingContext2D) {
    this.draw(context)
    if (this.frames % 100 === 0 && this.target) {
      this.projectiles.push(
        new Projectile({
          position: {
            x: this.center.x,
            y: this.center.y,
          },
          enemiesRef: this.enemiesRef,
          enemy: this.target,
        })
      )
    }
    this.frames++
  }
}

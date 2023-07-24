import { IBuildingOptions, IBulletParams, IPosition } from '../types'
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
  elapsedSpawnTime: number
  enemiesRef: React.MutableRefObject<Enemy[]>
  price: number
  image: HTMLImageElement
  imgPath: string
  currentFrame: number
  imgFrames: number
  elapsed: number
  offset: IPosition
  Bullet: typeof Projectile
  bulletParams: IBulletParams
  bulletOffset: IPosition

  constructor({
    position = { x: 0, y: 0 },
    enemiesRef,
    imgPath = '',
    frames = 1,
    offset = { x: 0, y: 0 },
    Bullet = Projectile,
    bulletParams = {},
    bulletOffset = { x: 0, y: 0 },
  }: IBuildingOptions) {
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
    this.elapsedSpawnTime = 0
    this.enemiesRef = enemiesRef
    this.price = 10
    this.image = new Image()
    this.image.src = imgPath
    this.imgPath = imgPath
    this.imgFrames = frames
    this.currentFrame = 0
    this.elapsed = 0
    this.offset = offset
    this.Bullet = Bullet
    this.bulletParams = bulletParams
    this.bulletOffset = bulletOffset
  }

  draw(context: CanvasRenderingContext2D) {
    this.elapsed++
    if (this.imgPath) {
      const cropWidth = this.image.width / this.imgFrames
      const crop = {
        position: {
          x: cropWidth * this.currentFrame,
          y: 0,
        },
        width: cropWidth,
        height: this.image.height,
      }
      context.drawImage(
        this.image,
        crop.position.x,
        crop.position.y,
        crop.width,
        crop.height,
        this.position.x + this.offset.x,
        this.position.y + this.offset.y,
        crop.width,
        crop.height
      )

      if (this.elapsed % 3 === 0 && this.target) {
        this.currentFrame++
        if (this.currentFrame >= this.imgFrames - 1) {
          this.currentFrame = 0
        }
      }
    } else {
      context.fillStyle = 'blue'
      context.fillRect(this.position.x, this.position.y, this.width, tileSize)
    }
    context.beginPath()
    context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
    context.fillStyle = 'rgba(0,0,255, 0.1)'
    context.fill()
  }

  update(context: CanvasRenderingContext2D) {
    this.draw(context)
    if (this.currentFrame === 6 && this.elapsed % 3 === 0) {
      this.shoot()
    }
  }
  shoot() {
    if (this.target) {
      this.projectiles.push(
        new this.Bullet({
          position: {
            x: this.center.x + this.bulletOffset.x,
            y: this.center.y + this.bulletOffset.y,
          },
          enemiesRef: this.enemiesRef,
          enemy: this.target,
          speed: 10,
          ...this.bulletParams,
        })
      )
    }
  }
}

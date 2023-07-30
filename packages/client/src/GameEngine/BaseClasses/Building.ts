import { IBuildingOptions, IBulletParams, IPosition } from '../types'
import { tileSize, towerSize } from '../baseConstants'
import { Projectile } from './Projectile'
import { Enemy } from './Enemy'
import React from 'react'
import { EColors } from '../../App/constants'

export class Building {
  position: IPosition
  width: number
  height: number
  center: IPosition
  projectiles: Projectile[]
  radius: number
  target: Enemy | null
  elapsedSpawnTime: number
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
  fireOnFrame: number
  renderEachXFrame: number

  constructor({
    position = { x: 0, y: 0 },
    imgPath = '',
    frames = 1,
    offset = { x: 0, y: 0 },
    Bullet = Projectile,
    bulletParams = {},
    bulletOffset = { x: 0, y: 0 },
    fireOnFrame = 1,
    renderEachXFrame = 3
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
    this.update = this.update.bind(this)
    this.shoot = this.shoot.bind(this)
    this.target = null
    this.elapsedSpawnTime = 0
    this.price = 10
    this.image = new Image()
    this.image.src = imgPath
    this.imgPath = imgPath
    this.imgFrames = frames
    this.currentFrame = 0
    this.elapsed = 0
    this.offset = offset
    this.fireOnFrame = fireOnFrame
    this.renderEachXFrame = renderEachXFrame
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

      if (this.elapsed % this.renderEachXFrame === 0 && this.target) {
        this.currentFrame++
        if (this.currentFrame >= this.imgFrames - 1) {
          this.currentFrame = 0
        }
      }
    } else {
      context.fillStyle = EColors.BLUE
      context.fillRect(this.position.x, this.position.y, this.width, tileSize)
    }
    context.beginPath()
    context.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2)
    context.fillStyle = 'rgba(0,0,255, 0.1)'
    context.fill()
  }

  update(context: CanvasRenderingContext2D) {
    this.draw(context)
    if (this.currentFrame === this.fireOnFrame && this.elapsed % this.renderEachXFrame === 0) {
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
          enemy: this.target,
          ...this.bulletParams,
        })
      )
    }
  }
}

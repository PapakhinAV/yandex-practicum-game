import { Placement } from './AbstractClasses/Placement'
import { Building } from './AbstractClasses/Building'
import React from 'react'
import { Enemy } from './AbstractClasses/Enemy'
import { Projectile } from './AbstractClasses/Projectile'

export interface IPosition {
  x: number
  y: number
}

export interface IEnemy {
  position: IPosition
  width: number
  height: number
  wayPointIndex: number
  center: IPosition
  draw: (context: CanvasRenderingContext2D) => void
  update: (context: CanvasRenderingContext2D) => void
}

export interface IPlacementOptions {
  position?: IPosition
}

export interface IBuildingOptions {
  position?: IPosition
  enemiesRef: React.MutableRefObject<Enemy[]>
  imgPath?: string
  frames?: number
  offset?: IPosition
  Bullet?: typeof Projectile
  bulletParams?: IBulletParams
  bulletOffset?: IPosition
}

export interface IBulletParams {
  speed?: number
  power?: number
}

export interface IEnemyOptions {
  waypoints: IPosition[]
  gap?: number
  health?: number
  speed?: number
  imgPath?: string
  frames?: number
}

export interface IProjectileOptions {
  position?: IPosition
  enemiesRef: React.MutableRefObject<Enemy[]>
  enemy: Enemy
  speed?: number
  power?: number
  imgPath?: string
}

export interface IAnimateCanvasParams {
  context: CanvasRenderingContext2D | null | undefined
  background: HTMLImageElement
  placementTiles: Placement[]
  buildingsRef: React.RefObject<Building[]>
  enemiesRef: React.MutableRefObject<Enemy[]>
  mouseRef: React.MutableRefObject<IPosition>
  waves: ICreateEnemyOptions[]
  hearts: React.MutableRefObject<number>
  setHearts: (newValue: number) => void
  onEnemyDefeated: (coins: number, scorePoints: number) => void
}

export interface ICreateEnemyOptions {
  quantity: number
  levelPoints: IPosition[]
  gap?: number
  health?: number
  speed?: number
  EnemyModel: typeof Enemy
}

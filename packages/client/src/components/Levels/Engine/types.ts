import { Placement } from './Placement'
import { Building } from './Building'
import React from 'react'
import { Enemy } from './Enemy'

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
}

export interface IEnemyOptions {
  waypoints: IPosition[]
  gap?: number
  health?: number
  speed?: number
}

export interface IProjectileOptions {
  position?: IPosition
  enemiesRef: React.MutableRefObject<Enemy[]>
  enemy: Enemy
  speed?: number
  power?: number
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
}

export interface ICreateEnemyOptions {
  quantity: number
  levelPoints: IPosition[]
  gap?: number
  health?: number
  speed?: number
}

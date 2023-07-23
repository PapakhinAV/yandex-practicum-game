import { Placement } from './Placement'
import { Building } from './Building'
import React from 'react'

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
}

export interface IAnimateCanvasParams {
  context: CanvasRenderingContext2D | null | undefined
  background: HTMLImageElement
  placementTiles: Placement[]
  buildingsRef: React.RefObject<Building[]>
  enemies: IEnemy[]
  mouseRef: React.MutableRefObject<IPosition>
}

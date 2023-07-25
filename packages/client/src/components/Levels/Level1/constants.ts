import { ICreateEnemyOptions } from '../Engine/types'
import { Ork } from '../Engine/Enemies/Ork'

export const level1WayPoints = [
  { x: -100, y: 580 },
  { x: 356, y: 608 },
  { x: 350, y: 148 },
  { x: 670, y: 154 },
  { x: 671, y: 545 },
  { x: 989, y: 544 },
  { x: 990, y: 89 },
  { x: 1391, y: 93 },
]

export const level1Placements = [
  0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0,
  0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0,
  0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0,
  0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 14, 0, 0, 0, 14, 0,
  14, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 14, 0, 0,
]

export const enemyWavesLevel1: ICreateEnemyOptions[] = [
  {
    quantity: 3,
    levelPoints: level1WayPoints,
    gap: 100,
    speed: 3,
    EnemyModel: Ork,
  },
  {
    quantity: 1,
    levelPoints: level1WayPoints,
    gap: 150,
    speed: 1,
    health: 300,
    EnemyModel: Ork,
  },
]

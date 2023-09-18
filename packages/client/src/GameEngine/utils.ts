import { ICreateEnemyOptions, IPosition } from './types'
import { Enemy } from './BaseClasses/Enemy'
import { collsOnMap } from './baseConstants'
import { Building } from './BaseClasses/Building'
import { Ork } from './GameElements'
import { Projectile } from './BaseClasses/Projectile'

export const createEnemies = (params: ICreateEnemyOptions): Enemy[] => {
  const {
    quantity,
    levelPoints,
    gap = 100,
    health,
    speed,
    EnemyModel,
  } = params || {}
  const enemies: Enemy[] = []

  for (let i = 0; i < quantity; i++) {
    const xOffset = i * gap
    enemies.push(
      new EnemyModel({ waypoints: levelPoints, gap: xOffset, health, speed })
    )
  }
  return enemies
}

export const transformPlacementTo2D = (
  data: number[],
  chunkSize = collsOnMap
) => {
  const array2D = []

  for (let i = 0; i < data.length; i += chunkSize) {
    array2D.push(data.slice(i, i + chunkSize))
  }
  return array2D
}

export const calculateDistanceToProjectile = (projectile: Projectile) => {
  const xDistance = projectile.enemy.center.x - projectile.position.x
  const yDistance = projectile.enemy.center.y - projectile.position.y
  return Math.hypot(xDistance, yDistance)
}

export const calculateDistanceToBuilding = (
  enemy: Enemy,
  building: Building
) => {
  const xDistance = enemy.center.x - building.center.x
  const yDistance = enemy.center.y - building.center.y
  return Math.hypot(xDistance, yDistance)
}

export const healthToPixels = (
  health: number,
  fullHealth: number,
  fullHealthBarWidth: number
) => {
  if (health < 0) health = 0
  if (health > fullHealth) health = fullHealth

  const healthInPixels = (health / fullHealth) * fullHealthBarWidth

  return healthInPixels
}

export const generateSimpleWaves = (numberOfWaves: number, enemiesStep: number, wayPoints: IPosition[]): ICreateEnemyOptions[] => {
  const waves: ICreateEnemyOptions[] = []

  for (let i = 0; i < numberOfWaves; i++) {
    const wave: ICreateEnemyOptions = {
      levelPoints: wayPoints,
      quantity: (i + 1) * enemiesStep,
      gap: 100,
      speed: 3 * (1 + ((i + 1) * enemiesStep)/50),
      EnemyModel: Ork,
    }

    waves.push(wave)
  }

  return waves
}

export const compareBuildings = (a:Building, b:Building) => {
  if (a.position.y !== b.position.y) {
    return a.position.y < b.position.y ? -1 : 1
  }

  if (a.position.x !== b.position.x) {
    return a.position.x < b.position.x ? -1 : 1
  }
  
  return 0
}

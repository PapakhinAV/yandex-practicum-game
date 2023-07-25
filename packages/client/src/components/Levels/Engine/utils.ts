import { IAnimateCanvasParams, ICreateEnemyOptions } from './types'
import { Enemy } from './AbstractClasses/Enemy'
import { collsOnMap } from './baseConstants'
import { Building } from './AbstractClasses/Building'
import { Projectile } from './AbstractClasses/Projectile'

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

export const animateCanvasWrapper = (params: IAnimateCanvasParams) => {
  const animationFrameCallback = () => animateCanvas(params)
  const animationId = requestAnimationFrame(animationFrameCallback)
  if (params.hearts.current === 0) {
    cancelAnimationFrame(animationId)
  }
}

const animateCanvas = (params: IAnimateCanvasParams) => {
  const {
    context,
    background,
    placementTiles,
    enemiesRef,
    mouseRef,
    buildingsRef,
    waves,
    hearts,
    setHearts,
    onEnemyDefeated,
  } = params
  const buildings = buildingsRef.current
  const enemies = enemiesRef.current

  if (context) {
    context.drawImage(background, 0, 0)
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i]
      enemy.update(context)
      if (enemy.position.x > context.canvas.width) {
        setHearts(hearts.current - 1)
        enemies.splice(i, 1)
      }
    }

    if (enemies.length === 0 && waves.length > 0) {
      const nextWave = waves.shift()!
      enemiesRef.current = createEnemies(nextWave)
    }

    placementTiles.forEach(tile => {
      tile.update(context, mouseRef.current)
    })

    buildings?.forEach(building => {
      building.update(context)
      building.target = null

      const validEnemies = enemies.filter(enemy => {
        return (
          calculateDistanceToBuilding(enemy, building)
          < enemy.radius + building.radius
        )
      })
      building.target = validEnemies[0]

      for (let i = building.projectiles.length - 1; i >= 0; i--) {
        const projectile = building.projectiles[i]
        projectile.update(context)

        const distance = calculateDistanceToProjectile(projectile)
        if (distance < projectile.enemy.radius + projectile.radius) {
          projectile.enemy.health -= projectile.power
          if (projectile.enemy.health <= 0) {
            const enemyIndex = enemies.findIndex(enemy => {
              return projectile.enemy === enemy
            })
            if (enemyIndex > -1) {
              onEnemyDefeated(
                projectile.enemy.reward.coins,
                projectile.enemy.reward.points
              )
              enemies.splice(enemyIndex, 1)
            }
          }
          building.projectiles.splice(i, 1)
        }
      }
    })

    animateCanvasWrapper(params)
  }
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

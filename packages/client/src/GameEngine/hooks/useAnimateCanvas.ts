import { IAnimateCanvasParams } from '../types'
import { calculateDistanceToBuilding, calculateDistanceToProjectile, createEnemies } from '../utils'


const useAnimateCanvas = (params: IAnimateCanvasParams) => {

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

    // buildings - массив с существующими зданиями
    const buildings = buildingsRef.current
    // enemies - массив с существующими врагами
    const enemies = enemiesRef.current

    if (context) {

      // Отрисовка фона (карты)
      context.drawImage(background, 0, 0)

      // Отрисовка врагов (+ обновление позиций), а также проверка - добрался ли кто-то их них до конца карты.
      // Если враг добрался до конца, то удаляем его с карты и вычитаем одну жизнь.
      for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i]
        enemy.update(context)
        if (enemy.position.x > context.canvas.width) {
          setHearts(hearts.current - 1)
          enemies.splice(i, 1)
        }
      }

      // Проверка - если закончились враги в текущей волне - переходим к следующей волне
      if (enemies.length === 0 && waves.length > 0) {
        const nextWave = waves.shift()!
        enemiesRef.current = createEnemies(nextWave)
      }

      // Проверка позиции (координат) мышки относительно плиток, на которых можно строить здания.
      // Если мышка наведена на плитку, то цвет плитки нужно изменить. Аналог onHover.
      placementTiles.forEach(tile => {
        tile.update(context, mouseRef.current)
      })

      // Здания
      buildings?.forEach(building => {

        // Отрисовка зданий и выстрел (если есть цель). "Выстрел" - добавление экземпляра снаряда в массив с активными снарядами каждого здания.
        building.update(context)

        // Определение актуальной цели для стрельбы.
        // Формируется массив врагов, входящих в зону поражения здания, из массива берётся первый враг.
        building.target = null

        const validEnemies = enemies.filter(enemy => {
          return (
            calculateDistanceToBuilding(enemy, building)
            < enemy.radius + building.radius
          )
        })
        building.target = validEnemies[0]

        // Отрисовка снарядов для каждого здания.
        for (let i = building.projectiles.length - 1; i >= 0; i--) {
          const projectile = building.projectiles[i]
          projectile.update(context)

          const distance = calculateDistanceToProjectile(projectile)

          // Обработка попадания - при попадании снаряда во врага у врага вычитаются жизни, равные урону снаряда.
          // Если у врага закончились жизни - происходит удаление врага из массива.
          // При поражении врага начисляются очки и монеты.
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

      // Остановка анимации, если закончились жизни.
      if (hearts.current > 0) {
        requestAnimationFrame(() => animateCanvas(params))
      }
    }
  }

  animateCanvas(params)
}

export default useAnimateCanvas



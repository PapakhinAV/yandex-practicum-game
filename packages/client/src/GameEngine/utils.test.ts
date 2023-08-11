import {
  calculateDistanceToBuilding,
  calculateDistanceToProjectile,
  createEnemies, generateSimpleWaves, healthToPixels,
  transformPlacementTo2D
} from './utils'
import { Enemy } from './BaseClasses/Enemy'
import { Projectile } from './BaseClasses/Projectile'
import { Building } from './BaseClasses/Building'
import { IPosition } from './types'
import { Ork } from './GameElements'


describe('Utils входящие в GameEngine', () => {

  describe('createEnemies', () => {
    it('Возвращает пустой массив, если quantity = 0', () => {
      const result = createEnemies({ quantity: 0, levelPoints: [{ x: 0, y: 0 }], EnemyModel: Enemy  })
      expect(result).toEqual([])
    })
    it('Если не переданы параметры health и speed, то задаются стандартные значения', () => {
      const result = createEnemies({ quantity: 1, levelPoints: [{ x: 0, y: 0 }], EnemyModel: Enemy })
      expect(result[0].health).toEqual(100)
      expect(result[0].speed).toEqual(1)
    })
    it('Если не переданы параметр gap, то задаётся стандартное значение', () => {
      const result = createEnemies({ quantity: 2, levelPoints: [{ x: 0, y: 0 }], EnemyModel: Enemy })
      expect(result[0].position.x).toEqual(0)
      expect(result[1].position.x).toEqual(-100)
    })
    it('Создаёт заданное количество врагов', () => {
      const result = createEnemies({ quantity: 10, levelPoints: [{ x: 0, y: 0 }], EnemyModel: Enemy })
      expect(result.length).toEqual(10)
    })
  })

  describe('transformPlacementTo2D', () => {
    it('Возвращает 2D массив, в котором количество элеменов во вложенном массиве соответствует параметру chunkSize', () => {
      const data = [1, 2, 3, 4, 5, 6]
      const chunkSize = 3
      const expected = [[1, 2, 3], [4, 5, 6]]
      const result = transformPlacementTo2D(data, chunkSize)
      expect(result).toEqual(expected)
    })
  })

  describe('calculateDistanceToProjectile', () => {
    it('Возвращает корректное расстояние между снарядом и врагом', () => {
      const projectile = new Projectile({
        position: { x: 0, y: 0 },
        enemy: new Enemy({
          waypoints: [{ x: 100, y: 100 }],
          imgPath: ''
        })
      })
      const expectedDistance = 186.67619023324855
      const result = calculateDistanceToProjectile(projectile)
      expect(result).toBeCloseTo(expectedDistance)
    })
    it('Возвращает 0 когда центры совпадают', () => {
      const enemy = new Enemy({
        waypoints: [{ x: 100, y: 100 }],
        imgPath: ''
      })
      const projectile = new Projectile({
        position: { x: enemy.center.x, y: enemy.center.y }, // Используем центр врага
        enemy: enemy
      })
      const expectedDistance = 0
      const result = calculateDistanceToProjectile(projectile)
      expect(result).toBeCloseTo(expectedDistance)
    })
  })

    describe('calculateDistanceToBuilding', () => {
      it('Возвращает корректное значение (с учётом центров)', () => {
        const enemy = new Enemy({ waypoints: [{ x: 0, y: 0 }] })
        const building = new Building({ position: { x: 5, y: 5 } })
        const expectedDistance = 37.33630940518894
        expect(calculateDistanceToBuilding(enemy, building)).toBeCloseTo(expectedDistance, 5)
      })
    })

    describe('healthToPixels', () => {
        it('Возвращает fullHealthBarWidth, когда health равно fullHealth', () => {
          const health = 100
          const fullHealth = 100
          const fullHealthBarWidth = 200
          const result = healthToPixels(health, fullHealth, fullHealthBarWidth)
          expect(result).toEqual(fullHealthBarWidth)
        })
       it('Возвращает 0, когда health равно 0', () => {
          const health = 0
          const fullHealth = 100
          const fullHealthBarWidth = 200
          const result = healthToPixels(health, fullHealth, fullHealthBarWidth)
          expect(result).toEqual(0)
        })
       it('Возвращает половину fullHealthBarWidth когда health составляет половину от fullHealth', () => {
          const health = 50
          const fullHealth = 100
          const fullHealthBarWidth = 200
          const result = healthToPixels(health, fullHealth, fullHealthBarWidth)
          expect(result).toEqual(fullHealthBarWidth / 2)
        })
      })
  describe('generateSimpleWaves', () => {
    it('should generate correct wave configurations', () => {
      const numberOfWaves = 3
      const enemiesStep = 5
      const wayPoints: IPosition[] = [
        { x: 0, y: 0 },
        { x: 10, y: 10 }
      ]

      const result = generateSimpleWaves(numberOfWaves, enemiesStep, wayPoints)

      expect(result.length).toBe(numberOfWaves)

      for (let i = 0; i < numberOfWaves; i++) {
        expect(result[i].levelPoints).toEqual(wayPoints)
        expect(result[i].quantity).toBe((i + 1) * enemiesStep)
        expect(result[i].gap).toBe(100)
        expect(result[i].speed).toBeCloseTo(3 * (1 + ((i + 1) * enemiesStep) / 50))
        expect(result[i].EnemyModel).toBe(Ork)
      }
    })
  })
})

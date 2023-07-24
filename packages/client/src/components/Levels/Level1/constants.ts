import { ICreateEnemyOptions } from '../Engine/types'
import { Ork } from '../Engine/Enemies/Ork'

export const level1WayPoints = [
  {
    x: -100.6043468100023,
    y: 580,
  },
  {
    x: 356.391680299135,
    y: 608.78709978967,
  },
  {
    x: 350.549193736854,
    y: 148.399158681935,
  },
  {
    x: 670.717457349848,
    y: 154.241645244216,
  },
  {
    x: 671.885954662304,
    y: 545.688244917037,
  },
  {
    x: 989.717223650385,
    y: 544.519747604581,
  },
  {
    x: 990.885720962842,
    y: 89.974293059126,
  },
  {
    x: 1391.68029913531,
    y: 93.4797849964945,
  },
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

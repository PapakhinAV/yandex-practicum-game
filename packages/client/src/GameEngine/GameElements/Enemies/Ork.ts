import ork from '../../assets/Enemies/orc.png'
import { Enemy } from '../../BaseClasses/Enemy'
import { IEnemyOptions } from '../../types'

export class Ork extends Enemy {
  constructor(props: IEnemyOptions) {
    super({ ...props, imgPath: ork, frames: 7 })
  }
}

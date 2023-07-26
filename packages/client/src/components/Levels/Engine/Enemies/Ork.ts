import ork from '../assets/orc.png'
import { Enemy } from '../AbstractClasses/Enemy'
import { IEnemyOptions } from '../types'

export class Ork extends Enemy {
  constructor(props: IEnemyOptions) {
    super({ ...props, imgPath: ork, frames: 7 })
  }
}

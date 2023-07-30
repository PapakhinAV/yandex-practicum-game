import tower from '../../assets/Towers/tower.png'
import { Building } from '../../BaseClasses/Building'
import { IBuildingOptions } from '../../types'
import { Cannonball } from '../Projectiles/Сannonball'

export class OrkTower extends Building {
  constructor(props: Omit<IBuildingOptions, 'fireOnFrame'>) {
    super({
      ...props,
      imgPath: tower,
      frames: 19,
      offset: { x: 0, y: -80 },
      Bullet: Cannonball,
      bulletParams: {},
      bulletOffset: { x: -20, y: -128 },
      fireOnFrame: 6
    })
  }
}

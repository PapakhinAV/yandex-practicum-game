import tower from '../assets/tower.png'
import { Building } from '../AbstractClasses/Building'
import { IBuildingOptions } from '../types'
import { Cannonball } from '../Projectiles/Сannonball'

export class Tower extends Building {
  constructor(props: IBuildingOptions) {
    super({
      ...props,
      imgPath: tower,
      frames: 19,
      offset: { x: 0, y: -80 },
      Bullet: Cannonball,
      bulletParams: {},
      bulletOffset: { x: -20, y: -128 },
    })
  }
}

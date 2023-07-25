import { Projectile } from '../AbstractClasses/Projectile'
import { IProjectileOptions } from '../types'
import canonball from '../assets/projectile.png'

export class Cannonball extends Projectile {
  constructor(props: IProjectileOptions) {
    super({ ...props, imgPath: canonball })
  }
}

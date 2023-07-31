import { Projectile } from '../../BaseClasses/Projectile'
import { IProjectileOptions } from '../../types'
import canonball from '../../assets/Projectiles/projectile.png'

export class Cannonball extends Projectile {
  constructor(props: IProjectileOptions) {
    super({ ...props, imgPath: canonball })
  }
}

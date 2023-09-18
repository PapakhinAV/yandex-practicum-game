import { Placement } from '../../BaseClasses/Placement'
import { IPlacementOptions } from '../../types'
import placement from '../../assets/Placements/placement.png'
import placementHover from '../../assets/Placements/placement-hover.png'

export class DefaultPlacement extends Placement {
  constructor(props: IPlacementOptions) {
    super({ ...props, imgPath: placement, imgHoverPath:placementHover })
  }
}

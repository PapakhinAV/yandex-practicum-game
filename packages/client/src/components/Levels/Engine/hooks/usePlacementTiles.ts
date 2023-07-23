import { useMemo } from 'react'
import { Placement } from '../Placement'
import { transformPlacementTo2D } from '../utils'
import { titleSize } from '../baseConstants'

const usePlacementTiles = (levelPlacements: number[]) => {
  const placementData2D = useMemo(
    () => transformPlacementTo2D(levelPlacements),
    [levelPlacements]
  )
  const placementTiles: Placement[] = []

  placementData2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
      if (symbol === 14) {
        placementTiles.push(
          new Placement({
            position: { x: x * titleSize, y: y * titleSize },
          })
        )
      }
    })
  })

  return { placementTiles }
}

export default usePlacementTiles

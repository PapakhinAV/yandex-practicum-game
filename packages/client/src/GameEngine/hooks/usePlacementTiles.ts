import { useMemo } from 'react'
import { Placement } from '../BaseClasses/Placement'
import { transformPlacementTo2D } from '../utils'
import { tileSize } from '../baseConstants'

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
            position: { x: x * tileSize, y: y * tileSize },
          })
        )
      }
    })
  })
  return { placementTiles }
}

export default usePlacementTiles

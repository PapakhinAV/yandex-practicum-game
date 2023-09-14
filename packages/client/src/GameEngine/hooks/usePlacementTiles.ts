import { useMemo } from 'react'
import { Placement } from '../BaseClasses/Placement'
import { transformPlacementTo2D } from '../utils'
import { tileSize } from '../baseConstants'
import { DefaultPlacement } from '../GameElements/Placements/DefaultPlacement'

const usePlacementTiles = (levelPlacements: number[]) => {
  const placementData2D = useMemo(
    () => transformPlacementTo2D(levelPlacements),
    [levelPlacements]
  )
  const placementTiles = useMemo(() => {
    const tiles: Placement[] = []
    // Формирования массива с плитками на основе массива цифр
    placementData2D.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 14) {
          tiles.push(
            new DefaultPlacement({
              position: { x: x * tileSize, y: y * tileSize },
            })
          )
        }
      })
    })
    return tiles
  }, [placementData2D])
  return { placementTiles }
}

export default usePlacementTiles

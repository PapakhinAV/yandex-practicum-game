import React, { useEffect, useRef } from 'react'
import { Placement } from '../BaseClasses/Placement'
import { tileSize, towerSize } from '../baseConstants'
import { IPosition } from '../types'
import { DefaultPlacement } from '../GameElements/Placements/DefaultPlacement'

const useActiveTile = (
  mouseRef:  React.MutableRefObject<IPosition>,
  placementTiles: DefaultPlacement[]
) => {
  const activeTile = useRef<DefaultPlacement | null>(null)

  useEffect(() => {

      const x = mouseRef.current.x
      const y = mouseRef.current.y

      activeTile.current = null

      // Обработка движения мышки и определение активной плитки (той, над которой сейчас мышка)
      for (let i = 0; i < placementTiles.length; i++) {
        const tile = placementTiles[i]
        if (
          x > tile.position.x
          && x < tile.position.x + towerSize
          && y > tile.position.y
          && y < tile.position.y + tileSize
        ) {
          activeTile.current = tile
          break
        }
      }

  }, [mouseRef.current])

  return { activeTileRef: activeTile }
}

export default useActiveTile

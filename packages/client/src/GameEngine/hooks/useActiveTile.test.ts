import { Placement } from '../BaseClasses/Placement'
import { tileSize, towerSize } from '../baseConstants'
import { act, renderHook, waitFor } from '@testing-library/react'
import { useActiveTile } from './index'


describe('useActiveTile', () => {
  it('Должен корректно определять активную плитку, в зависимости от позиции мышки', async () => {
    const placementTiles = [
      new Placement({ position: { x: 0, y: 0 } }),
      new Placement({ position: { x: 0, y: tileSize } }),
      new Placement({ position: { x: towerSize, y: 0 } }),
    ]
    const mouseRef = { current: { x: 5, y: 5 } }


    const { result, rerender } = renderHook(() => useActiveTile(mouseRef, placementTiles))

    expect(result.current.activeTileRef.current).toBe(placementTiles[0])

    act(() => {
      mouseRef.current = { x: 5, y: tileSize + 5 }
      rerender()
    })

    await waitFor(() => {
      expect(result.current.activeTileRef.current).toBe(placementTiles[1])
    })

    act(() => {
      mouseRef.current = { x: towerSize + 5, y: 5 }
      rerender()
    })

    await waitFor(() => {
      expect(result.current.activeTileRef.current).toBe(placementTiles[2])
    })
  })
})


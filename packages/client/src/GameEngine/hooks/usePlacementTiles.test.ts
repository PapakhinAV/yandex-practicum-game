import { renderHook } from '@testing-library/react'
import { usePlacementTiles } from './index'

describe('usePlacementTiles', () => {
  it('Возвращает корректное количество "плиток" в соответствии с входными данными', () => {
    const mockData = [
      0, 0, 14,
      0, 14, 0,
      14, 0, 0
    ]

    const { result } = renderHook(() => usePlacementTiles(mockData))
    const { placementTiles } = result.current

    expect(placementTiles.length).toBe(3)
  })
})




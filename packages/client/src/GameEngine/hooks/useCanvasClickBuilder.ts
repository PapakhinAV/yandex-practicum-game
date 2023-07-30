import { RefObject } from 'react'
import { Building, Placement } from '../index'
import { useDispatch, useSelector } from 'react-redux'
import { getCoins, removeCoins } from '../../pages/Game/gameSlice'

const useCanvasClickBuilder = (
  activeTile: RefObject<Placement | null>,
  buildingsRef: RefObject<Building[]>,
  Tower: typeof Building
) => {
  const coins = useSelector(getCoins)
  const dispatch = useDispatch()
  const canvasClickBuilder = () => {
    const tile = activeTile.current
    if (tile && buildingsRef.current && !tile.occupied) {
      const newTower = new Tower({
        position: {
          x: tile.position.x,
          y: tile.position.y,
        },
      })

      const isBuildingAvalible = coins >= newTower.price
      if (isBuildingAvalible) {
        buildingsRef.current.push(newTower)
        dispatch(removeCoins(newTower.price))
      }
      tile.occupied = true
    }
  }

  return canvasClickBuilder
}

export default useCanvasClickBuilder

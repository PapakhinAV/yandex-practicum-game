import { MutableRefObject, RefObject } from 'react'
import { Building, Enemy, Placement } from '../'
import { useDispatch, useSelector } from 'react-redux'
import { getCoins, removeCoins } from '../../../../pages/Game/gameSlice'

const useCanvasClickHandler = (
  activeTile: RefObject<Placement | null>,
  buildingsRef: RefObject<Building[]>,
  enemiesRef: MutableRefObject<Enemy[]>,
  Tower: typeof Building
) => {
  const coins = useSelector(getCoins)
  const dispatch = useDispatch()
  const canvasClickHandler = () => {
    const tile = activeTile.current
    if (tile && buildingsRef.current && !tile.occupied) {
      const newTower = new Tower({
        position: {
          x: tile.position.x,
          y: tile.position.y,
        },
        enemiesRef,
      })

      const isBuildingAvalible = coins >= newTower.price
      if (isBuildingAvalible) {
        buildingsRef.current.push(newTower)
        dispatch(removeCoins(newTower.price))
      }
      tile.occupied = true
    }
  }

  return canvasClickHandler
}

export default useCanvasClickHandler

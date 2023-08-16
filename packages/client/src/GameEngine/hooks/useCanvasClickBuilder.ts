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

  // Строительство нового здания - для строительства необходимо, чтобы плитка была свободной
  const canvasClickBuilder = () => {
    const tile = activeTile.current
    if (tile && buildingsRef.current && !tile.occupied) {
      const newTower = new Tower({
        position: {
          x: tile.position.x,
          y: tile.position.y,
        },
      })

      // Размещение здания стоит определённого количества монет, здание будет построено только если монет достаточно.
      // После строительства баланс уменьшается.
      const isBuildingAvalible = coins >= newTower.price
      if (isBuildingAvalible) {
        buildingsRef.current.push(newTower)
        dispatch(removeCoins(newTower.price))
        tile.occupied = true
      }
    }
  }

  return canvasClickBuilder
}

export default useCanvasClickBuilder

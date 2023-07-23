import { FC } from 'react'
import styles from './Game.module.scss'
import { Level1 } from '../../components'

const Game: FC = () => {
  return (
    <div className={styles.game__wrapper}>
      <Level1 />
    </div>
  )
}
export default Game

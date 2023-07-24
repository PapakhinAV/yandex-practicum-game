import React, { FC } from 'react'
import styles from './Game.module.scss'
import { Level1 } from '../../components'
import { Heading, Image } from '@chakra-ui/react'
import heart from './img/heart.svg'
import coinsImg from './img/coins.svg'
import { useSelector } from 'react-redux'
import { getCoins, getHearts } from './gameSlice'
import { createSelector } from 'reselect'

const getTotalHeartsAndCoins = createSelector(
  [getHearts, getCoins],
  (hearts, coins) => ({
    hearts,
    coins,
  })
)

const Game: FC = () => {
  const { hearts, coins } = useSelector(getTotalHeartsAndCoins)

  return (
    <div className={styles.game__wrapper}>
      <div className={styles.game__infoBar}>
        <div className={styles.game__infoItem}>
          <Image src={coinsImg} width={6} />
          <div>{coins}</div>
        </div>
        <div className={styles.game__infoItem}>
          <Image src={heart} width={6} />
          <div>{hearts}</div>
        </div>
      </div>
      <Level1 />
      {!hearts && <Heading className={styles.game__endGame}>Game Over</Heading>}
    </div>
  )
}
export default Game

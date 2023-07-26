import React, { FC } from 'react'
import styles from './Game.module.scss'
import { Level1 } from '../../components'
import { Image } from '@chakra-ui/react'
import heart from './img/heart.svg'
import coinsImg from './img/coins.svg'
import star from './img/star.svg'
import { useSelector } from 'react-redux'
import { getCoins, getHearts, getScore } from './gameSlice'
import { createSelector } from 'reselect'

const getTotalHeartsAndCoins = createSelector(
  [getHearts, getCoins, getScore],
  (hearts, coins, score) => ({
    hearts,
    coins,
    score,
  })
)

const Game: FC = () => {
  const { hearts, coins, score } = useSelector(getTotalHeartsAndCoins)

  return (
    <div className={styles.game__wrapper}>
      <div className={styles.game__infoBar}>
        <div className={styles.game__infoItem}>
          <Image src={star} width={6} />
          <div>{score}</div>
        </div>
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
      {!hearts && (
        <div className={styles.game__endGame}>
          <p>Game Over</p>
          <p>Score: {score}</p>
        </div>
      )}
    </div>
  )
}
export default Game

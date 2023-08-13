import { FC, useEffect } from 'react'
import styles from './Game.module.scss'
import { Level } from '../../components'
import { Image } from '@chakra-ui/react'
import heart from './img/heart.svg'
import coinsImg from './img/coins.svg'
import star from './img/star.svg'
import { useSelector } from 'react-redux'
import { 
  getCoins, 
  getHearts, 
  getScore, 
  getStatus, 
  EGameStatus 
} from './gameSlice'
import { createSelector } from 'reselect'
import { Button } from '../../components'
import { useNavigate } from 'react-router-dom'
import { ERoutes } from '../../core/Router/ERoutes'
import { IRootState } from '../../store/types'
import { useAddScoreMutation } from '../../api/leaderboard'

const getTotalHeartsAndCoins = createSelector(
  [getHearts, getCoins, getScore, getStatus],
  (hearts, coins, score, status) => ({
    hearts,
    coins,
    score,
    status
  })
)

const Game: FC = () => {
  const navigate = useNavigate()
  const { hearts, coins, score, status } = useSelector(getTotalHeartsAndCoins)
  const user = useSelector((state: IRootState) => state.app.user)
  const isAuthenticated = !!user
  const [addScore, { isError, isLoading }] = useAddScoreMutation()

  useEffect(() => {
    if (status === EGameStatus.GAME_OVER && isAuthenticated) {
      const scoreData = {
        score: score,
        username: user.login,
        id: user.id,
      }

      addScore(scoreData)
    }
  }, [status, isAuthenticated, addScore])

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
      <Level />
      {!hearts && (
        <div className={styles.game__overlay}>
          <div className={styles.game__endGame}>
            <h2 className={styles.game__endGameTitle}>Game Over</h2>
            <p className={styles.game__endGameText}>Score: {score}</p>
            {isError && (
              <p className={styles.game__errorMessage}>Не удалось сохранить</p>
            )}
            <Button 
              width='250px'
              disabled={isLoading}
              onClick={() => navigate(ERoutes.HOME)}
            >
              Вернуться в меню
            </Button>
            <Button 
              width='250px' 
              disabled={isLoading}
              onClick={() => navigate(0)
            }>
              Повторить игру
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
export default Game

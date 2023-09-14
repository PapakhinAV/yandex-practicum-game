import { FC, useEffect, useState } from 'react'
import styles from './Game.module.scss'
import { Button, Level, NavButton, Timer } from '../../components'
import { Image, Box } from '@chakra-ui/react'
import heart from './img/heart.svg'
import coinsImg from './img/coins.svg'
import star from './img/star.svg'
import { useSelector } from 'react-redux'
import { EGameStatus, getCoins, getHearts, getScore, getStatus } from './gameSlice'
import { createSelector } from 'reselect'
import { useNavigate } from 'react-router-dom'
import { ERoutes } from '../../core/Router/ERoutes'
import { IRootState } from '../../store/types'
import { useAddScoreMutation } from '../../api/leaderboard'
import { ENavButtonDirection } from '../../components/NavButton/types'
import classNames from 'classnames'
import { EThemes } from '../../types/EThemes'

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
  const [initGame, setInitGame] = useState(false)
  const { hearts, coins, score, status } = useSelector(getTotalHeartsAndCoins)
  const user = useSelector((state: IRootState) => state.app.user)
  const isAuthenticated = !!user
  const [addScore, { isError, isLoading }] = useAddScoreMutation()

  const currentTheme = useSelector((state: IRootState) => state.app.theme)

  const startGame = () => {
    setInitGame(true)
  }

  useEffect(() => {
    if (status === EGameStatus.GAME_OVER && isAuthenticated) {
      const scoreData = {
        score: score,
        username: user.display_name || user.login,
      }

      addScore(scoreData)
    }
    if (status === EGameStatus.GAME_OVER && ('Notification' in window)) {
      const showNotification = () => {
        const notification = new Notification('Ура', { body: 'Поздравляем, вы проиграли, код можно посмотреть тут' })
        notification.onclick = (event: Event) => {
          event.preventDefault()
          window.open('https://github.com/PapakhinAV/yandex-practicum-game')
        }
      }
      if (Notification.permission === 'granted') {
        showNotification()
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission()
          .then(permission => permission === 'granted' && showNotification())
      }
    }
  }, [status, isAuthenticated, addScore])

  return (
    <div className={styles.game__wrapper}>
      {
        !initGame
          ? <div className={styles.game__overlay}>
              <div className={classNames(styles.game__endGame, 
              {
                [styles.game__dayTheme]: currentTheme === EThemes.DAY,
                [styles.game__nightTheme]: currentTheme === EThemes.NIGHT,
              })}>
              <p className={styles.game__startGameText}>Игра начнется через:</p>
              <Timer startTime={3} stopTimer={startGame}></Timer>
              <Button
                width='250px'
                disabled={isLoading}
                onClick={() => setInitGame(true)
              }>
                Играть
              </Button>
              </div>
            </div>
          : <>
              <Box position={'absolute'} left={4} top={4} >
                <NavButton direction={ENavButtonDirection.HOME}/>
              </Box>
              <div className={styles.game__header}>
                <div className={classNames(styles.game__infoBar, 
                  {
                    [styles.game__dayTheme]: currentTheme === EThemes.DAY,
                    [styles.game__nightTheme]: currentTheme === EThemes.NIGHT,
                  })}>
                  <div className={styles.game__infoItem}>
                    <Image src={star} width={6} />
                    <div className={styles.game__infoDigits}>{score}</div>
                  </div>
                  <div className={styles.game__infoItem}>
                    <Image src={coinsImg} width={6} />
                    <div className={styles.game__infoDigits}>{coins}</div>
                  </div>
                  <div className={styles.game__infoItem}>
                    <Image src={heart} width={6} />
                    <div className={styles.game__infoDigits}>{hearts}</div>
                  </div>
                </div>
              </div>
              <Level />
              {!hearts && (
                <div className={styles.game__overlay}>
                  <div className={classNames(styles.game__endGame, 
                    {
                      [styles.game__dayTheme]: currentTheme === EThemes.DAY,
                      [styles.game__nightTheme]: currentTheme === EThemes.NIGHT,
                    })}>
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
            </>
      }
    </div>
  )
}
export default Game

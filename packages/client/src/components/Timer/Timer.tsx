import React, { useState, useEffect } from 'react'
import styles from './Timer.module.scss'
import { CustomFormProps } from './types'
import { useSelector } from 'react-redux'
import { IRootState } from '../../store/types'
import classNames from 'classnames'
import { EThemes } from '../../types/EThemes'

const Timer: React.FC<CustomFormProps> = params  => {
  const currentTheme = useSelector((state: IRootState) => state.app.theme)

  const [seconds, setSeconds] = useState(params.startTime)
  let time = params.startTime

  const getTime = () => {
    --time
    time === 0 ? params.stopTimer() : setSeconds(time)
  }

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={classNames(styles.timer, {
      [styles.timer__dayTheme]: currentTheme === EThemes.DAY,
      [styles.timer__nightTheme]: currentTheme === EThemes.NIGHT,
    })}>
     {seconds}
    </div>
  )
}

export default Timer

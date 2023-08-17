import React, { useState, useEffect } from 'react'
import styles from './Timer.module.scss'
import { CustomFormProps } from './types'

const Timer: React.FC<CustomFormProps> = params  => {
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
    <div className={styles.timer}>
     {seconds}
    </div>
  )
}

export default Timer

import { useCallback, useEffect, useRef, useState } from 'react'

interface UseCountdownTimerOptions {
  initialTime: number
  onExpire: () => void
}

export function useCountdownTimer({ initialTime, onExpire }: UseCountdownTimerOptions) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const timerRef = useRef<number | null>(null)
  const onExpireRef = useRef(onExpire)

  useEffect(() => {
    onExpireRef.current = onExpire
  }, [onExpire])

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
  }, [])

  const startTimer = useCallback(() => {
    clearTimer()
    timerRef.current = window.setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          clearTimer()
          onExpireRef.current()
          return 0
        }

        return previousTime - 1
      })
    }, 1000)
  }, [clearTimer])

  const resetTimer = useCallback(() => {
    clearTimer()
    setTimeLeft(initialTime)
  }, [clearTimer, initialTime])

  useEffect(() => {
    startTimer()

    return () => {
      clearTimer()
    }
  }, [clearTimer, startTimer])

  return {
    clearTimer,
    resetTimer,
    startTimer,
    timeLeft,
  }
}

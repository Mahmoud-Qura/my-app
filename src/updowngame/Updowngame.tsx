import { useEffect, useRef, useState } from 'react'
import './Updowngame.css'

interface Question {
  original: number
  flipped: number
}

const questions: Question[] = [
  { original: 18, flipped: 81 },
  { original: 96, flipped: 96 },
  { original: 25, flipped: 52 },
  { original: 69, flipped: 69 },
  { original: 81, flipped: 18 },
  { original: 52, flipped: 25 },
]

export default function Updowngame() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(120)
  const [gameActive, setGameActive] = useState(true)
  const [userAnswer, setUserAnswer] = useState('')
  const [message, setMessage] = useState('')
  const timerRef = useRef<number | null>(null)

  const currentQuestion = questions[currentIndex]
  const isGameFinished = currentIndex >= questions.length

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)

    timerRef.current = window.setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          setGameActive(false)
          setMessage(`Time is up! Click Replay to try again. Points: ${score} / 6`)
          return 0
        }

        return previousTime - 1
      })
    }, 1000)
  }

  useEffect(() => {
    startTimer()

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const endGame = (reason: string) => {
    if (!gameActive) return

    setGameActive(false)
    if (timerRef.current) clearInterval(timerRef.current)
    setMessage(`${reason} Final score: ${score} out of 6. Press Replay to try again.`)
  }

  const winGame = () => {
    if (!gameActive) return

    setGameActive(false)
    if (timerRef.current) clearInterval(timerRef.current)
    setMessage('Brilliant! You completed every number successfully!')
  }

  const checkAnswer = () => {
    if (!gameActive || isGameFinished) return

    const numericAnswer = Number.parseInt(userAnswer, 10)
    if (Number.isNaN(numericAnswer)) {
      setMessage('Please enter a valid number.')
      return
    }

    const correctOriginal = currentQuestion.original
    if (numericAnswer === correctOriginal) {
      const nextScore = score + 1
      const nextIndex = currentIndex + 1

      setScore(nextScore)
      setMessage('Correct! Move on to the next one.')
      setUserAnswer('')

      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex)
      } else {
        winGame()
      }
      return
    }

    endGame(`Wrong! The correct number was ${correctOriginal}. Game over.`)
  }

  const resetGame = () => {
    if (timerRef.current) clearInterval(timerRef.current)

    setCurrentIndex(0)
    setScore(0)
    setTimeLeft(120)
    setGameActive(true)
    setUserAnswer('')
    setMessage('')
    startTimer()
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const isInputDisabled = !gameActive || isGameFinished

  return (
    <div className="game-container" id="game">
      <div className="game-header">
        <p className="eyebrow">Brain teaser</p>
        <h2>The Flipped Number</h2>
        <p className="subtitle">Read the mirrored number and enter the original value.</p>
      </div>

      <div className="info">
        <span>
          Points: <span id="score">{score}</span> / 6
        </span>
        <span>
          Time: <span id="timer">{formatTime(timeLeft)}</span>
        </span>
      </div>
      <div className="instruction" id="how-to-play">
        The number is flipped. What is the real number?
      </div>
      <div className="flipped-number">{!isGameFinished ? currentQuestion.flipped : 'Target'}</div>
      <input
        type="number"
        value={userAnswer}
        onChange={(event) => setUserAnswer(event.target.value)}
        onKeyDown={(event) => event.key === 'Enter' && checkAnswer()}
        placeholder="Enter the original number"
        disabled={isInputDisabled}
      />
      <div>
        <button onClick={checkAnswer} disabled={isInputDisabled}>
          Check
        </button>
        <button onClick={resetGame} className="reset-btn" id="restart">
          Replay
        </button>
      </div>
      <div id="message">{message}</div>
    </div>
  )
}

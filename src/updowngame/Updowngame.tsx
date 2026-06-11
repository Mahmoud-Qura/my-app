import { type ChangeEvent, type KeyboardEvent, useCallback, useState } from 'react'
import classNames from 'classnames'
import { useCountdownTimer } from './hooks/useCountdownTimer'
import { totalQuestions, useGameViewState } from './hooks/useGameViewState'

const initialTime = 120

export default function Updowngame() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(true)
  const [userAnswer, setUserAnswer] = useState('')
  const [message, setMessage] = useState('')

  const handleTimerExpire = useCallback(() => {
    setGameActive(false)
    setMessage(`Time is up! Click Replay to try again. Points: ${score} / ${totalQuestions}`)
  }, [score])

  const {
    clearTimer,
    resetTimer,
    startTimer,
    timeLeft,
  } = useCountdownTimer({
    initialTime,
    onExpire: handleTimerExpire,
  })

  const {
    currentQuestion,
    feedbackClasses,
    formattedTime,
    isGameFinished,
    isInputDisabled,
    progress,
    roundNumber,
    timeChipClasses,
  } = useGameViewState({
    currentIndex,
    gameActive,
    message,
    score,
    timeLeft,
  })

  const endGame = useCallback(
    (reason: string) => {
      if (!gameActive) return

      setGameActive(false)
      clearTimer()
      setMessage(`${reason} Final score: ${score} out of ${totalQuestions}. Press Replay to try again.`)
    },
    [clearTimer, gameActive, score],
  )

  const winGame = useCallback(() => {
    if (!gameActive) return

    setGameActive(false)
    clearTimer()
    setMessage('Brilliant! You completed every number successfully!')
  }, [clearTimer, gameActive])

  const checkAnswer = useCallback(() => {
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

      if (nextIndex < totalQuestions) {
        setCurrentIndex(nextIndex)
      } else {
        winGame()
      }
      return
    }

    endGame(`Wrong! The correct number was ${correctOriginal}. Game over.`)
  }, [currentIndex, currentQuestion.original, endGame, gameActive, isGameFinished, score, userAnswer, winGame])

  const resetGame = useCallback(() => {
    clearTimer()
    resetTimer()

    setCurrentIndex(0)
    setScore(0)
    setGameActive(true)
    setUserAnswer('')
    setMessage('')
    startTimer()
  }, [clearTimer, resetTimer, startTimer])

  const handleAnswerChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value)
  }, [])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        checkAnswer()
      }
    },
    [checkAnswer],
  )

  return (
    <div
      className="relative w-full max-w-2xl overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/75 p-5 text-center text-slate-800 shadow-[0_28px_90px_rgba(15,30,45,0.12)] backdrop-blur-md sm:p-7"
      id="game"
    >
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-sky-300/15 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-28 w-28 rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="mb-4">
        <p className="mb-2 text-[0.72rem] font-extrabold uppercase tracking-[0.28em] text-sky-600">
          Brain teaser
        </p>
        <h2 className="text-[clamp(1.6rem,2vw+1rem,2.2rem)] font-semibold leading-tight text-slate-900">
          The Flipped Number
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
          Read the mirrored number and enter the original value.
        </p>
      </div>

      <div className="mb-5 rounded-[1.5rem] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(248,250,252,0.95),rgba(255,255,255,0.96))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-sm">
            <span className="size-2 rounded-full bg-emerald-500" />
            Round {roundNumber} of {totalQuestions}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 font-semibold">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-2 text-sm text-slate-700">
              Points <span id="score" className="text-slate-900">{score}</span> / {totalQuestions}
            </span>
            <span
              className={classNames('inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-semibold', timeChipClasses)}
            >
              Time <span id="timer">{formattedTime}</span>
            </span>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white shadow-inner shadow-slate-900/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div
        className="mb-4 rounded-full border border-sky-100 bg-sky-50/80 px-4 py-3 text-sm font-medium text-slate-600"
        id="how-to-play"
      >
        The number is flipped. What is the real number?
      </div>

      <div className="mb-4 rounded-[1.75rem] border border-slate-800/5 bg-[linear-gradient(180deg,#0f172a,#1e293b)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_40px_rgba(15,23,42,0.2)]">
        <div className="mb-3 flex items-center justify-between px-1 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-slate-300">
          <span>Mirror display</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] tracking-[0.2em] text-slate-200">
            Flipped
          </span>
        </div>
        <div className="flex min-h-[7rem] select-none items-center justify-center rounded-[1.35rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(251,191,36,0.16),_transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.9),rgba(30,41,59,0.98))] px-4 py-8 text-[clamp(3rem,8vw,5rem)] font-black tracking-[clamp(0.25rem,1.5vw,0.75rem)] text-amber-200 shadow-[inset_0_0_0_2px_rgba(248,232,120,0.35)] [transform:rotate(180deg)]">
          {!isGameFinished ? currentQuestion.flipped : 'Target'}
        </div>
      </div>

      <input
        className="mx-auto mb-4 block w-full max-w-sm rounded-full border border-slate-200 bg-white/95 px-5 py-3.5 text-center text-xl text-slate-900 shadow-[0_10px_24px_rgba(15,23,42,0.06)] outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-200/50 disabled:cursor-not-allowed disabled:opacity-60"
        type="number"
        value={userAnswer}
        onChange={handleAnswerChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter the original number"
        disabled={isInputDisabled}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          className="rounded-full bg-[linear-gradient(135deg,#2563eb,#14b8a6)] px-5 py-3.5 text-lg font-semibold text-white shadow-[0_14px_30px_rgba(37,99,235,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(37,99,235,0.3)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-full sm:max-w-[12rem]"
          onClick={checkAnswer}
          disabled={isInputDisabled}
        >
          Check
        </button>
        <div id="restart" className="sm:w-full sm:max-w-[12rem]">
          <button
            className="w-full rounded-full border border-slate-200 bg-white px-5 py-3.5 text-lg font-semibold text-slate-700 shadow-[0_14px_30px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)] disabled:cursor-not-allowed disabled:opacity-60"
            onClick={resetGame}
          >
            Replay
          </button>
        </div>
      </div>

      <div id="message" aria-live="polite" className={classNames('mt-5 rounded-2xl border px-4 py-3 text-sm font-semibold shadow-sm', feedbackClasses)}>
        {message}
      </div>
    </div>
  )
}

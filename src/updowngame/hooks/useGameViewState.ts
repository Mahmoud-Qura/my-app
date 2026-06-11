import { useMemo } from 'react'
import classNames from 'classnames'

export interface Question {
  original: number
  flipped: number
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const questionsData: Question[] = [
  { original: 18, flipped: 81 },
  { original: 96, flipped: 96 },
  { original: 25, flipped: 52 },
  { original: 69, flipped: 69 },
  { original: 81, flipped: 18 },
  { original: 52, flipped: 25 },
]

const questions = shuffleArray(questionsData)

const totalQuestions = questions.length

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

function getTimeChipClasses(timeLeft: number) {
  return classNames({
    'border-rose-200 bg-rose-50 text-rose-700': timeLeft <= 20,
    'border-slate-200 bg-white text-slate-800': timeLeft > 20,
  })
}

function getFeedbackClasses(message: string) {
  const isEmpty = !message
  const isCorrect = !!message && message.startsWith('Correct')
  const isWrong = !!message && message.startsWith('Wrong')
  const isTimeUp = !!message && message.startsWith('Time is up')
  const isInfo = !isEmpty && !isCorrect && !isWrong && !isTimeUp

  return classNames({
    'border-slate-200 bg-slate-50 text-slate-500': isEmpty,
    'border-emerald-200 bg-emerald-50 text-emerald-700': isCorrect,
    'border-rose-200 bg-rose-50 text-rose-700': isWrong,
    'border-amber-200 bg-amber-50 text-amber-800': isTimeUp,
    'border-sky-200 bg-sky-50 text-slate-700': isInfo,
  })
}

interface UseGameViewStateArgs {
  currentIndex: number
  gameActive: boolean
  message: string
  score: number
  timeLeft: number
}

export function useGameViewState({
  currentIndex,
  gameActive,
  message,
  score,
  timeLeft,
}: UseGameViewStateArgs) {
  return useMemo(() => {
    const activeIndex = Math.min(currentIndex, totalQuestions - 1)
    const currentQuestion = questions[activeIndex]
    const isGameFinished = currentIndex >= totalQuestions
    const roundNumber = Math.min(currentIndex + 1, totalQuestions)
    const progress = Math.round((score / totalQuestions) * 100)

    return {
      currentQuestion,
      feedbackClasses: getFeedbackClasses(message),
      formattedTime: formatTime(timeLeft),
      isGameFinished,
      isInputDisabled: !gameActive || isGameFinished,
      progress,
      roundNumber,
      timeChipClasses: getTimeChipClasses(timeLeft),
    }
  }, [currentIndex, gameActive, message, score, timeLeft])
}

export { totalQuestions }

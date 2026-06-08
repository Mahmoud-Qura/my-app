import { useMemo } from 'react'

export interface Question {
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

const totalQuestions = questions.length

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

function getTimeChipClasses(timeLeft: number) {
  return timeLeft <= 20
    ? 'border-rose-200 bg-rose-50 text-rose-700'
    : 'border-slate-200 bg-white text-slate-800'
}

function getFeedbackClasses(message: string) {
  if (!message) {
    return 'border-slate-200 bg-slate-50 text-slate-500'
  }

  if (message.startsWith('Correct')) {
    return 'border-emerald-200 bg-emerald-50 text-emerald-700'
  }

  if (message.startsWith('Wrong')) {
    return 'border-rose-200 bg-rose-50 text-rose-700'
  }

  if (message.startsWith('Time is up')) {
    return 'border-amber-200 bg-amber-50 text-amber-800'
  }

  return 'border-sky-200 bg-sky-50 text-slate-700'
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

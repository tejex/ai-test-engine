export type QuestionType = 'multiple_choice' | 'short_answer' | 'true_false'
export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Question {
  id: string
  type: QuestionType
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
  difficulty: Difficulty
  source: string
  sourceChunkId: string
  testId: string
}

export interface QuestionComponentProps {
  value?: string
  onChange: (value: string) => void
  question?: Question
}
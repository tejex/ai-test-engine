export type QuestionType =
  | 'multiple_choice'
  | 'multi_select'
  | 'short_answer'
  | 'true_false'
  | 'fill_in_blank'
  | 'matching'
  | 'ordering'
  | 'scenario'
export type Difficulty = 'easy' | 'medium' | 'hard'

export type MatchingOptions = {
  prompts: string[]
  choices: string[]
}

export type QuestionOptions = string[] | MatchingOptions

export interface Question {
  id: string
  type: QuestionType
  question: string
  options?: QuestionOptions
  correctAnswer: string
  explanation: string
  difficulty: Difficulty
  source: string
  sourceChunkId: string
  testId: string
}

export interface QuestionComponentProps {
  value?: string | undefined
  onChange: (value: string) => void
  question?: Question
}

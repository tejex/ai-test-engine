import type { GenerationSettings } from "./generationSettings.js";

//Future Prompt
const difficultyInstructions = {
  easy: "- Overall difficulty target: easy. Prefer direct recall, core definitions, and foundational relationships.",
  medium: "- Overall difficulty target: medium. Mix easy, medium, and hard questions, with most questions at medium difficulty.",
  hard: "- Overall difficulty target: hard. Prefer application, nuance, comparisons, and multi-step reasoning when supported by the context.",
} satisfies Record<GenerationSettings["difficulty"], string>;

const questionMixInstructions = {
  balanced: `- Question mix target: balanced.
- Use a healthy variety of recall and application questions.
- Include several question types when they naturally fit the notes.`,
  recall: `- Question mix target: recall focused.
- Prefer multiple_choice, true_false, fill_in_blank, and short_answer.
- Focus on definitions, facts, key relationships, and core concepts from the notes.`,
  application: `- Question mix target: application focused.
- Prefer scenario, short_answer, multi_select, matching, and ordering when they naturally fit.
- Ask students to apply, compare, diagnose, sequence, or reason from the notes.`,
} satisfies Record<GenerationSettings["questionMix"], string>;

export const content =  (context: string, settings: GenerationSettings) => {

    return `
You are generating a structured educational test.

Rules:
- Output STRICT valid JSON only
- No markdown
- No code blocks
- Generate exactly ${settings.questionCount} questions
- Escape any line breaks inside JSON string values as \\n
- Do not include literal unescaped tabs or newlines inside quoted strings
- Questions MUST be answerable ONLY from the provided context
${difficultyInstructions[settings.difficulty]}
${questionMixInstructions[settings.questionMix]}
- Generate a mix of:
  - multiple_choice
  - multi_select
  - short_answer
  - true_false
  - fill_in_blank
  - matching
  - ordering
  - scenario
- Include explanations
- Include difficulty
- Include source snippet from context
- Use question types only when they naturally fit the context. Do not force math/calculation questions.
- For multi_select, options MUST be an array of strings and correctAnswer MUST be a JSON-stringified array of correct options.
- For matching, options MUST be an object with "prompts" and "choices" arrays. correctAnswer MUST be a JSON-stringified object mapping each prompt to its matching choice.
- For ordering, options MUST be an array of steps. correctAnswer MUST be a JSON-stringified array in the correct order.
- For fill_in_blank, include a blank in the question using "____".
- For scenario, ask the student to apply the context to a short realistic situation.

Return format:

{
  "examTitle": "A concise, specific exam title based on the provided context",
  "questions": [
    {
      "id": "q1",
      "type": "multiple_choice",
      "question": "string",
      "options": ["string"] or { "prompts": ["string"], "choices": ["string"] },
      "correctAnswer": "string",
      "explanation": "string",
      "difficulty": "easy | medium | hard",
      "source": "string"
    }
  ]
}

Context:
${context}
`
}

export const gradingPrompt = ({
  question,
  correctAnswer,
  userAnswer,
  explanation,
}: any) => `
You are grading a student's answer.

Return STRICT JSON only.

{
  "isCorrect": true,
  "score": 1,
  "feedback": "Short explanation"
}

Question:
${question}

Correct Answer:
${correctAnswer}

Explanation:
${explanation}

Student Answer:
${userAnswer}

Grading guidance:
- Award partial credit when an answer is substantially correct but incomplete.
- For multi-select, matching, and ordering answers, the student answer and correct answer may be JSON strings. Compare their meaning, not just raw formatting.
- For scenario and short-answer questions, grade the reasoning against the expected answer and explanation.
`;

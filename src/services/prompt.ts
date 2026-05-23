


//Future Prompt
export const content =  (context: any) => {

    return `
You are generating a structured educational test.

Rules:
- Output STRICT valid JSON only
- No markdown
- No code blocks
- Escape any line breaks inside JSON string values as \\n
- Do not include literal unescaped tabs or newlines inside quoted strings
- Questions MUST be answerable ONLY from the provided context
- Generate a mix of:
  - multiple_choice
  - short_answer
  - true_false
- Include explanations
- Include difficulty
- Include source snippet from context

Return format:

{
  "examTitle": "A concise, specific exam title based on the provided context",
  "questions": [
    {
      "id": "q1",
      "type": "multiple_choice",
      "question": "string",
      "options": ["string"],
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
`;

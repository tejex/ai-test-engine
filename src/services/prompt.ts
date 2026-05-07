


//Future Prompt
// export const content =  (context: any) => {

//     return `
// You are generating a structured educational test.

// Rules:
// - Output STRICT valid JSON only
// - No markdown
// - No code blocks
// - Questions MUST be answerable ONLY from the provided context
// - Generate a mix of:
//   - multiple_choice
//   - short_answer
//   - true_false
// - Include explanations
// - Include difficulty
// - Include source snippet from context

// Return format:

// {
//   "questions": [
//     {
//       "id": "q1",
//       "type": "multiple_choice",
//       "question": "string",
//       "options": ["string"],
//       "correctAnswer": "string",
//       "explanation": "string",
//       "difficulty": "easy | medium | hard",
//       "source": "string"
//     }
//   ]
// }

// Context:
// ${context}
// `
// }

export const content = (context: any) => {
  return `
You are generating a structured educational test.

IMPORTANT: Your response must be valid JSON with EXACTLY this structure:

{
  "questions": [
    {
      "text": "The question text goes here",
      "answer": "The correct answer goes here", 
      "explanation": "Explanation of why this is correct"
    }
  ]
}

Do NOT include: options, type, difficulty, id, or any other fields.
Only use "text", "answer", and "explanation".

Context:
${context}
`;
};
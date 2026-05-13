import groq from "../lib/groq.js"
import { gradingPrompt } from "./prompt.js"
import { safeParse } from "./generation.js";


export async function gradeQuestion(data: any) {
  const res = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: gradingPrompt(data),
      },
    ],
  });

  const content = res.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No grading response");
  }

  return safeParse(content);
}
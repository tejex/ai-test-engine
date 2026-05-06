import groq from "../lib/groq.js";

export function safeParse(json: string) {
  try {
    return JSON.parse(json);
  } catch {
    const match = json.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("Invalid JSON");
    return JSON.parse(match[0]);
  }
}

export async function generateQuestions(context: string) {
  const res = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [
      {
        role: "system",
        content: "Generate quiz questions from provided context. Output strict JSON.",
      },
      {
        role: "user",
        content: `
Context:
${context}

Return JSON:
{
  "questions": [
    {
      "text": "...",
      "answer": "...",
      "explanation": "..."
    }
  ]
}
        `,
      },
    ],
  });

  const choice = res.choices?.[0];
  if (!choice || !choice.message?.content) {
    throw new Error("No response from Groq");
  }

  return safeParse(choice.message.content);
}
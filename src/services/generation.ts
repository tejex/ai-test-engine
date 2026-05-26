import groq from "../lib/groq.js"
import { content } from "./prompt.js"
import type { GenerationSettings } from "./generationSettings.js";

function extractJsonObject(value: string) {
  const cleaned = value
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();

  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Invalid JSON");

  return match[0];
}

function escapeControlCharactersInStrings(value: string) {
  let repaired = "";
  let inString = false;
  const validEscapes = new Set(["\"", "\\", "/", "b", "f", "n", "r", "t", "u"]);

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];

    if (char === "\\") {
      const nextChar = value[index + 1];

      if (inString && (!nextChar || !validEscapes.has(nextChar))) {
        repaired += "\\\\";
      } else {
        repaired += char;
        if (nextChar) {
          index += 1;
          repaired += nextChar;
        }
      }

      continue;
    }

    if (char === "\"") {
      repaired += char;
      inString = !inString;
      continue;
    }

    if (inString) {
      if (char === "\n") {
        repaired += "\\n";
        continue;
      }

      if (char === "\r") {
        repaired += "\\r";
        continue;
      }

      if (char === "\t") {
        repaired += "\\t";
        continue;
      }
    }

    repaired += char;
  }

  return repaired;
}

export function safeParse(json: string) {
  const jsonObject = extractJsonObject(json);

  try {
    return JSON.parse(jsonObject)
  } catch (err) {
    const repairedJson = escapeControlCharactersInStrings(jsonObject);

    try {
      return JSON.parse(repairedJson)
    } catch (repairErr) {
      console.error("Failed to parse generated JSON", {
        originalError: err,
        repairError: repairErr,
        preview: repairedJson.slice(0, 1000),
      });

      throw repairErr;
    }
  }
}

export async function generateQuestions(context: string, settings: GenerationSettings) {
  const res = await groq.chat.completions.create({
    model:"llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "Generate quiz questions from provided context. Output strict valid JSON only. Escape newlines inside string values as \\n.",
      },
      {
        role: "user",
        content: content(context, settings),
      },
    ],
  })

  const choice = res.choices?.[0];
  if (!choice || !choice.message?.content) {
    throw new Error("No response from Groq")
  }

  return safeParse(choice.message.content)
}

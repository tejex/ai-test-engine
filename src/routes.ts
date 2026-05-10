import { Router } from "express"
import { PrismaClient } from "../src/generated/prisma/client" // Update this path

import { chunkText } from "./services/ingestion"
import { generateQuestions } from "./services/generation"

const router = Router()
const prisma = new PrismaClient()

router.post("/documents", async (req, res) => {
  try {
    const { title, text } = req.body;

    const doc = await prisma.document.create({
      data: {
        title,
        rawText: text,
      },
    });

    const chunks = chunkText(text);

    await prisma.chunk.createMany({
      data: chunks.map((content: any) => ({
        content,
        embedding: [],
        documentId: doc.id,
      })),
    });

    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to create document" })
  }
});

router.post("/tests/generate", async (req, res) => {
  try {
    const { documentId } = req.body

    const chunks = await prisma.chunk.findMany({
      where: { documentId },
      take: 3,
    })

    const context = chunks.map((c:any) => c.content).join("\n\n")
    const data = await generateQuestions(context)

    const test = await prisma.test.create({
      data: {
        documentId,
        questions: {
          create: data.questions.map((q: any, i: number) => ({
            id: `q_${Date.now()}_${i}`,
            type: q.type,
            // Handle both naming conventions
            question: q.question || q.text,
            correctAnswer: q.correctAnswer || q.answer,
            explanation: q.explanation,
            difficulty: q.difficulty || 'medium',
            source: q.source || 'Generated from document context',
            //@ts-ignore
            sourceChunkId: chunks[i % chunks.length].id,
            options: q.options || null,
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    res.json(test)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "failed to generate test" })
  }
})

router.get("/tests/:id", async (req, res) => {
  try {
    const test = await prisma.test.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        questions: true,
      },
    })

    res.json(test)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "failed to fetch test" })
  }
})

export default router
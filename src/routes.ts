import { Router } from "express"
import { PrismaClient } from "../src/generated/prisma/client" // Update this path

import { chunkText } from "./services/ingestion"
import { generateQuestions } from "./services/generation"
import { gradeQuestion } from "./services/grading";

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
    const examTitle =
      typeof data.examTitle === "string" && data.examTitle.trim()
        ? data.examTitle.trim()
        : "Generated Study Exam";

    await prisma.document.update({
      where: { id: documentId },
      data: { title: examTitle },
    });

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

router.post("/tests/:id/submit", async (req, res) => {
  try {
    const { answers } = req.body;

    const test = await prisma.test.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        questions: true,
      },
    });

    if (!test) {
      return res.status(404).json({ error: "Test not found" });
    }

    const gradedResponses = await Promise.all(
      test.questions.map(async (question: any) => {
        const userAnswer = answers[question.id] || "";

        const grading = await gradeQuestion({
          question: question.question,
          correctAnswer: question.correctAnswer,
          userAnswer,
          explanation: question.explanation,
        });

        return {
          questionId: question.id,
          userAnswer,
          isCorrect: grading.isCorrect,
          score: grading.score,
          feedback: grading.feedback,
        };
      })
    );

    const totalScore =
      gradedResponses.reduce((acc, curr) => acc + curr.score, 0) /
      gradedResponses.length;

    const attempt = await prisma.attempt.create({
      data: {
        testId: test.id,
        score: totalScore,
        responses: {
          create: gradedResponses,
        },
      },
      include: {
        responses: {
          include: {
            question: true,
          },
        },
      },
    });

    res.json(attempt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit test" });
  }
});

router.get("/results/:attemptId", async (req, res) => {
  try {
    const attempt = await prisma.attempt.findUnique({
      where: {
        id: req.params.attemptId,
      },
      include: {
        responses: {
          include: {
            question: true,
          },
        },
        test: true,
      },
    });

    res.json(attempt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch results" });
  }
});

router.get("/attempts/recent", async (_, res) => {
  try {
    const attempts = await prisma.attempt.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      include: {
        test: {
          include: {
            document: true,
          },
        },
      },
    });

    res.json(attempts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch attempts" });
  }
});

router.delete("/attempts/:id", async (req, res) => {
  try {
    const attempt = await prisma.attempt.findUnique({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
      },
    });

    if (!attempt) {
      return res.status(404).json({ error: "Attempt not found" });
    }

    await prisma.$transaction([
      prisma.response.deleteMany({
        where: {
          attemptId: req.params.id,
        },
      }),
      prisma.attempt.delete({
        where: {
          id: req.params.id,
        },
      }),
    ]);

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete attempt" });
  }
});

router.delete("/attempts", async (_, res) => {
  try {
    await prisma.$transaction([
      prisma.response.deleteMany(),
      prisma.attempt.deleteMany(),
    ]);

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete attempts" });
  }
});

export default router

import { Router } from "express";
import { Difficulty, QuestionType } from "../generated/prisma/enums";
import { prisma } from "../db/prisma";
import { generateQuestions } from "../services/generation";
import { normalizeGenerationSettings } from "../services/generationSettings";
import { gradeQuestion } from "../services/grading";

const router = Router();

const questionTypes = new Set(Object.values(QuestionType));
const difficulties = new Set(Object.values(Difficulty));

const stringifyAnswer = (answer: unknown) =>
  typeof answer === "string" ? answer : JSON.stringify(answer);

router.post("/generate", async (req, res) => {
  try {
    const { documentId } = req.body;
    const settings = normalizeGenerationSettings(req.body.settings);

    const chunks = await prisma.chunk.findMany({
      where: { documentId },
      take: 3,
    });

    if (!chunks.length) {
      return res.status(400).json({ error: "No document chunks found" });
    }

    const context = chunks.map((chunk) => chunk.content).join("\n\n");
    const data = await generateQuestions(context, settings);

    if (!data.questions.length) {
      return res.status(500).json({ error: "No questions were generated" });
    }

    const generatedQuestions = data.questions.slice(0, settings.questionCount);

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
          create: generatedQuestions.map((question: any, index: number) => ({
            id: `q_${Date.now()}_${index}`,
            type: questionTypes.has(question.type) ? question.type : QuestionType.short_answer,
            question: question.question || question.text,
            correctAnswer: stringifyAnswer(question.correctAnswer || question.answer),
            explanation: question.explanation,
            difficulty: difficulties.has(question.difficulty) ? question.difficulty : Difficulty.medium,
            source: question.source || "Generated from document context",
            sourceChunkId: chunks[index % chunks.length]!.id,
            options: question.options || null,
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    res.json(test);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to generate test" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const test = await prisma.test.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        questions: true,
      },
    });

    res.json(test);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to fetch test" });
  }
});

router.post("/:id/submit", async (req, res) => {
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
      test.questions.map(async (question) => {
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
      }),
    );

    const totalScore =
      gradedResponses.reduce((acc, curr) => acc + curr.score, 0) / gradedResponses.length;

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

export default router;

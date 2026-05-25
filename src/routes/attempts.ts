import { Router } from "express";
import { prisma } from "../db/prisma";

const router = Router();

router.get("/recent", async (_, res) => {
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
        responses: {
          include: {
            question: true,
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

router.delete("/:id", async (req, res) => {
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

router.delete("/", async (_, res) => {
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

export default router;

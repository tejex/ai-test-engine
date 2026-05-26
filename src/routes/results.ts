import { Router } from "express";
import { prisma } from "../db/prisma";

const router = Router();

router.get("/:attemptId", async (req, res) => {
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
        test: {
          include: {
            document: true,
          },
        },
      },
    });

    res.json(attempt);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch results" });
  }
});

export default router;

import { Router } from "express";
import { prisma } from "../db/prisma";
import { chunkText } from "../services/ingestion";

const router = Router();

router.post("/", async (req, res) => {
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
      data: chunks.map((content: string) => ({
        content,
        embedding: [],
        documentId: doc.id,
      })),
    });

    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to create document" });
  }
});

export default router;

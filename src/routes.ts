import { Router } from "express";
import attemptsRouter from "./routes/attempts";
import documentsRouter from "./routes/documents";
import resultsRouter from "./routes/results";
import testsRouter from "./routes/tests";

const router = Router();

router.use("/documents", documentsRouter);
router.use("/tests", testsRouter);
router.use("/results", resultsRouter);
router.use("/attempts", attemptsRouter);

export default router;

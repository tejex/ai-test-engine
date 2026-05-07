import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => res.send("ok"));

app.use(routes);

app.listen(3001, () => {
  console.log("server running on 3001");
});
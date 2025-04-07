import type { GetTestResponse } from "@monorepo/types";

import cors from "cors";
import express from "express";
import morgan from "morgan";

const app: express.Express = express();

app.use(morgan("tiny"));
app.use(express.json({ limit: "100mb" }));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  }),
);

app.get("/", (_, res) => {
  res.send("Hello from Express!");
});

app.get("/test", (_, res) => {
  const testJson: GetTestResponse = {
    message: "Hello from Express API!",
  };
  res.json(testJson);
});

export default app;

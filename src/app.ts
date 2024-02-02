import express, { Request, Response, Application } from "express";
import { testDbConnection } from "../config/db";

const app: Application = express();

testDbConnection();
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

export default app;

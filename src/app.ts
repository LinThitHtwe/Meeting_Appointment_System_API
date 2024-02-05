import express, { Request, Response, Application } from "express";
import { testDbConnection } from "../config/db";
import cors from "cors";
import { timingMiddleware } from "./middleware/timing.middleware";
import routes from "./routes/index";
import { globalErrorHandler } from "./middleware/error_handler.middleware";

const app: Application = express();

testDbConnection();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(timingMiddleware);
app.use("/api/v1/", routes);
app.use(globalErrorHandler);

export default app;

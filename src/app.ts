import express, { Request, Response, Application } from "express";
import { testDbConnection } from "../config/db";
import cors from "cors";
import { timingMiddleware } from "./middleware/timing.middleware";
import routes from "./routes/index";
import { globalErrorHandler } from "./middleware/error_handler.middleware";
import Department from "./models/Department";
import Room from "./models/Room";
import Account from "./models/Account";
import Appointment from "./models/Appointment";

const app: Application = express();
// Department.sync();
// Room.sync();
// Account.sync();
// Appointment.sync();

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

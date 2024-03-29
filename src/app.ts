import express, { Request, Response, Application } from "express";
import { testDbConnection } from "../config/db";
import cors from "cors";
import { timingMiddleware } from "./middleware/timing.middleware";
import routes from "./routes/index";
import { globalErrorHandler } from "./middleware/error_handler.middleware";
import Department from "./models/Department";
import Room from "./models/Room";
import Account from "./models/Admin";
import Appointment from "./models/Appointment";
import WorkingHours from "./models/WorkingHours";
import router from "./routes";
import Holiday from "./models/Holiday";
require("dotenv").config();
console.log(process.env.CLIENT_PORT);
const app: Application = express();

testDbConnection()
  .then(() => {
    Holiday.sync();
    Department.sync();
    Room.sync();
    Account.sync();
    WorkingHours.sync();
    Appointment.sync();
  })
  .catch((error: Error) => {
    console.error("Unable to connect to the database:", error);
  });

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_PORT,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(timingMiddleware);
app.use("/api/v1/", router);
app.use(globalErrorHandler);

export default app;

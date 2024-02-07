import { Router } from "express";
import workingHourController from "../controller/workingHour.controller";

const route = Router();
route.get("/", workingHourController.index);
route.patch("/:id", workingHourController.updateOne);

export default route;

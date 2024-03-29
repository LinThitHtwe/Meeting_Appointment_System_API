import { Router } from "express";
import workingHourController from "../controller/workingHour.controller";

const route = Router();
route.get("/", workingHourController.index);
route.post("/", workingHourController.store);
route.get("/:id", workingHourController.show);
route.patch("/:id", workingHourController.updateOne);
route.post("/:id", workingHourController.activateWorkingHour);
route.delete("/:id", workingHourController.deleteOne);

export default route;

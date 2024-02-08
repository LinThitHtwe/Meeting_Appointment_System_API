import { Router } from "express";
import workingHourController from "../controller/workingHour.controller";

const route = Router();
route.get('/', workingHourController.index);
route.post('/', workingHourController.store);
route.get("/:id", workingHourController.show);

export default route;
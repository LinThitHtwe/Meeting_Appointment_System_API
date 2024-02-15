import express from "express";
import holidayController from "../controller/holiday.controller";
const router = express.Router();

router.get("/", holidayController.index);
router.get("/:id", holidayController.show);
router.post("/", holidayController.store);
router.patch("/:id", holidayController.updateOne);
router.delete("/:id", holidayController.remove);
export default router;

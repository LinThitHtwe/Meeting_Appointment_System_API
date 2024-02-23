import express from "express";
import appointmentController from "../controller/appointment.controller";
const router = express.Router();

router.get("/", appointmentController.getAll);
router.get("/detail/:id", appointmentController.getOne);
router.post("/", appointmentController.store);
router.patch("/:id", appointmentController.updateOne);
router.post("/:id", appointmentController.compareAppointmentCode);
router.get("/room/:roomId", appointmentController.getAppointmentRoomId);
router.get("/count", appointmentController.getCount);

export default router;

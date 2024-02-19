import express from "express";
import departmentRoutes from "./department.route";
import workingHourRoutes from "./workingHour.route";
import roomRoutes from "./room.route";
import accountRoutes from "./account.route";
import holidayRoutes from "./holiday.route";
import appointmentRoutes from "./appointment.route";

const router = express.Router();

router.use("/auth", accountRoutes);
router.use("/room", roomRoutes);
router.use("/department", departmentRoutes);
router.use("/appointment", appointmentRoutes);
router.use("/working_hour", workingHourRoutes);
router.use("/holiday", holidayRoutes);

export default router;

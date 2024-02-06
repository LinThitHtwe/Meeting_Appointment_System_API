import express from "express";
import departmentRoutes from "./department.route";

import appointmentRoutes from "./appointment.route";
import roomRoutes from "./room.route";
const router = express.Router();

router.use("/room", roomRoutes);
router.use("/department", departmentRoutes);
router.use("/appointment", appointmentRoutes);

export default router;

import express from "express";
import workingHourRoutes from "./workingHour.route";
// import roomRoutes from "./room.route";
// import departmentRoutes from "./department.route";
// import accountRoutes from "./account.route";
// import appointmentRoutes from "./appointment.route";

const router = express.Router();

// router.use("/room", roomRoutes);
// router.use("/department", departmentRoutes);
// router.use("/account", accountRoutes);
// router.use("/appointment", appointmentRoutes);
router.use("/working_hour", workingHourRoutes)

export default router;

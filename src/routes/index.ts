import express from "express";
import roomRoutes from "./room.route";
import departmentRoutes from "./department.route";
const router = express.Router();

router.use("/room", roomRoutes);
router.use("/department", departmentRoutes);

export default router;

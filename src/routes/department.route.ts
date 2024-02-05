import express from "express";
import departmentController from "../controller/department.controller";
const router = express.Router();

router.get("/", departmentController.getAll);
router.get("/:id", departmentController.getOne);
router.post("/", departmentController.store);

export default router;

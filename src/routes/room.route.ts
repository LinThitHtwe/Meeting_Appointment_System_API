import express from "express";
import roomController from "../controller/room.controller";
const router = express.Router();

router.get("/", roomController.getAll);
router.get("/:id", roomController.getOne);
router.post("/", roomController.store);
router.patch("/:id", roomController.updateOne);
export default router;

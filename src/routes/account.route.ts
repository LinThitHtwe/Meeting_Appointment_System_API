import express from "express";
import accountController from "../controller/account.controller";
const router = express.Router();

router.get("/", accountController.getAll);
router.get("/:id", accountController.getOne);
router.post("/", accountController.store);

export default router;

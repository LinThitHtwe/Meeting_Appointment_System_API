import express from "express";
import accountController from "../controller/account.controller";
const router = express.Router();

router.post("/login", accountController.userLogin);

export default router;

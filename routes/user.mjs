import express from "express";
const router = express.Router();
import userCtrl from "../controllers/User.mjs";

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

export default router;

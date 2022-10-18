import express from "express";
const router = express.Router();
import cuisinesCtrl from "../controllers/cuisines.mjs";

router.get("/", cuisinesCtrl.get);

export default router;

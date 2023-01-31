import express, { Request, Response } from "express";
import { getHeartRateData } from "../controllers/apiController";

const router = express.Router();

router.get("/heartRateData", getHeartRateData);

module.exports = router;

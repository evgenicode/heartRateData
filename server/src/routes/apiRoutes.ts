import express, { Request, Response } from "express";
import { getHeartRateData } from "../controllers/apiController";
import { getHeartRateDataFromDatabase } from "../controllers/apiController";
import { getSleepData } from "../controllers/apiController";

const router = express.Router();

router.get("/heartRateData", getHeartRateData);
router.get("/heartRateDataFromDatabase", getHeartRateDataFromDatabase);
router.get("/getSleepData", getSleepData);

module.exports = router;

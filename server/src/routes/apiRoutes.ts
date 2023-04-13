import express, { Request, Response } from "express";
import {
  getHeartRateDataDev,
  getHeartRateData,
  getSleepData,
  getSleepDataDev,
} from "../controllers/apiController";

const router = express.Router();

router.get("/heartRateDataDev", getHeartRateDataDev);
router.get("/heartRateData", getHeartRateData);
router.get("/getSleepData", getSleepData);
router.get("/getSleepDataDev", getSleepDataDev);

module.exports = router;

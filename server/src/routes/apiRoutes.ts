import express, { Request, Response } from "express";
import { getHeartRateData } from "../controllers/apiController";
import { getHeartRateDataFromDatabase } from "../controllers/apiController";

const router = express.Router();

router.get("/heartRateData", getHeartRateData);
router.get("/heartRateDataFromDatabase", getHeartRateDataFromDatabase);

module.exports = router;

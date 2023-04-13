import { Request, Response } from "express";
import {
  heartRateDataFormated,
  sleepDataFormatted,
} from "../data/getLocalData";
import expressAsyncHandler = require("express-async-handler");
import healthDetailData from "../models/healthDetailModel";
import { heartRateDataPoint, sleepDataPoint } from "../interfaces/interfaces";
import { heartRateFilter } from "../filters/heartRateFilter";
import { sleepDataFilter } from "../filters/sleepDataFilter";

const CLIENT_URL = process.env.CLIENT_URL;

export const getHeartRateDataDev = expressAsyncHandler(
  async (req: Request, res: Response) => {
    res.set("Access-Control-Allow-Origin", CLIENT_URL);
    res.send(heartRateDataFormated);
  }
);

export const getHeartRateData = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const data: Array<heartRateDataPoint> = await healthDetailData.find({
      type: 7,
    });
    const filteredData = heartRateFilter(data);
    res.set("Access-Control-Allow-Origin", CLIENT_URL);
    res.status(200).json(filteredData);
  }
);

export const getSleepDataDev = expressAsyncHandler(
  async (req: Request, res: Response) => {
    res.set("Access-Control-Allow-Origin", CLIENT_URL);
    res.send(sleepDataFormatted);
  }
);

export const getSleepData = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const data: Array<sleepDataPoint> = await healthDetailData.find({
      type: 9,
    });
    const filteredData = sleepDataFilter(data);
    res.set("Access-Control-Allow-Origin", CLIENT_URL);
    res.status(200).json(filteredData);
  }
);

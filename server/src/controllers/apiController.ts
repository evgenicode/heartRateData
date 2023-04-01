import { Request, Response } from "express";
import { heartRateDataFormated } from "../data/getLocalData";
import expressAsyncHandler = require("express-async-handler");
import healthDetailData from "../models/healthDetailModel";
import { hasHealthTypeCode } from "../interfaces/interfaces";
import { heartRateFilter } from "../filters/heartRateFilter";
import { hasHealthTypeCode2 } from "../interfaces/interfaces";

const CLIENT_URL = process.env.CLIENT_URL;

export const getHeartRateData = expressAsyncHandler(
  async (req: Request, res: Response) => {
    res.set("Access-Control-Allow-Origin", CLIENT_URL);
    res.send(heartRateDataFormated);
  }
);

export const getHeartRateDataFromDatabase = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const data: Array<hasHealthTypeCode> = await healthDetailData.find({
      type: 7,
    });
    const filteredData = heartRateFilter(data);
    res.set("Access-Control-Allow-Origin", CLIENT_URL);
    res.status(200).json(filteredData);
  }
);

export const getSleepData = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const data: Array<any> = await healthDetailData.find({
      type: 9,
    });

    res.set("Access-Control-Allow-Origin", CLIENT_URL);
    res.status(200).json(data);
  }
);

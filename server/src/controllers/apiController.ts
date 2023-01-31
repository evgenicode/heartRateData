import { Request, Response } from "express";
import { heartRateDataFormated } from "../data/getLocalData";

export const getHeartRateData = (req: Request, res: Response) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.send(heartRateDataFormated);
};

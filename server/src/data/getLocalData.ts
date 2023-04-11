import fs from "fs";
import { hasHealthTypeCode } from "../interfaces/interfaces";
import { heartRateFilter } from "../filters/heartRateFilter";
import { sleepDataFilter } from "../filters/sleepDataFilter";

const LOCAL_DATA_STORAGE = process.env.LOCAL_DATA_STORAGE;

if (!LOCAL_DATA_STORAGE) {
  throw new Error(
    "LOCAL_DATA_STORAGE is not defined in environment variables."
  );
}

export const data = JSON.parse(fs.readFileSync(LOCAL_DATA_STORAGE, "utf-8"));

export const heartRateData = data.filter(
  (item: hasHealthTypeCode) => item.type === 7
);

export const sleepData = data.filter((item: any) => item.type === 9);

export const sleepDataFormatted = sleepDataFilter(sleepData);

export const heartRateDataFormated = heartRateFilter(heartRateData);

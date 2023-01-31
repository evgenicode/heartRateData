import fs from "fs";

const LOCAL_DATA_STORAGE = process.env.LOCAL_DATA_STORAGE;

interface hasHealthTypeCode {
  startTime: number;
  samplePoints: any;
  type: number;
}

if (!LOCAL_DATA_STORAGE) {
  throw new Error(
    "LOCAL_DATA_STORAGE is not defined in environment variables."
  );
}

export const data = JSON.parse(fs.readFileSync(LOCAL_DATA_STORAGE, "utf-8"));

export const heartRateData = data.filter(
  (item: hasHealthTypeCode) => item.type === 7
);

export const heartRateDataFormated = heartRateData.map(function (
  item: hasHealthTypeCode
) {
  const startTime = new Date(item.samplePoints[0].startTime);
  const value = item.samplePoints[0].value;
  return { startTime, value };
});

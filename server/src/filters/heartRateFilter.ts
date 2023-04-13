import { heartRateDataPoint } from "../interfaces/interfaces";

export const heartRateFilter = (data: Array<heartRateDataPoint>) =>
  data.map((item) => {
    const startTime = new Date(item.samplePoints[0].startTime);
    const value = item.samplePoints[0].value;
    return { startTime, value };
  });

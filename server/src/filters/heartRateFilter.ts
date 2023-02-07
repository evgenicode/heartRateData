import { hasHealthTypeCode } from "../interfaces/interfaces";

export const heartRateFilter = (data: Array<hasHealthTypeCode>) =>
  data.map((item) => {
    const startTime = new Date(item.samplePoints[0].startTime);
    const value = item.samplePoints[0].value;
    return { startTime, value };
  });

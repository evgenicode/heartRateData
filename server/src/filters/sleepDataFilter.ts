import { sleepDataPoint } from "../interfaces/interfaces";

export const sleepDataFilter = (data: Array<sleepDataPoint>) => {
  console.log(data);
  const result = [];
  let current = null;
  for (const item of data) {
    const startTime = new Date(item.samplePoints[0].startTime);
    const endTime = new Date(item.samplePoints[0].endTime);
    const key = item.samplePoints[0].key;
    if (
      current &&
      current.endTime.getTime() === startTime.getTime() &&
      current.key === key
    ) {
      current.endTime = endTime;
    } else {
      current = { startTime, endTime, key };
      result.push(current);
    }
  }
  return result;
};

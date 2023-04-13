import { getTimeline, infinityNaNguard } from "utils";

export const SummaryHeartRate = ({ data, filteredData, brushExtent }) => {
  const dynamicData = brushExtent ? filteredData : data;

  const getMinMaxValues = () => {
    const minValue = dynamicData.reduce(
      (min, { value }) => Math.min(min, value),
      Infinity
    );
    const maxValue = dynamicData.reduce(
      (max, { value }) => Math.max(max, value),
      0
    );
    return { minValue, maxValue };
  };

  const sumOfAllMeasurements = (data) =>
    data.reduce((accumulator, current) => accumulator + current.value, 0);

  const minutesTotal = getTimeline(dynamicData).minutesTotal;
  const minValue = infinityNaNguard(getMinMaxValues(dynamicData).minValue);
  const maxValue = getMinMaxValues(dynamicData).maxValue;
  const missingDatapoints = minutesTotal - dynamicData.length;

  const averageBPM = infinityNaNguard(
    (
      sumOfAllMeasurements(dynamicData) /
      (minutesTotal - missingDatapoints)
    ).toFixed(1)
  );

  const averageMeasurement = infinityNaNguard(
    minutesTotal / dynamicData.length
  ).toFixed(2);

  return (
    <div className="grey-text">
      <h3>HR Summary</h3>
      <p>Max value: {maxValue} BPM</p>
      <p>Min value: {minValue} BPM</p>
      <p>Avg value: {averageBPM} BPM</p>
      <p>{dynamicData.length} datapoints</p>
      <p>Avg measurement interval: {averageMeasurement} min</p>
    </div>
  );
};

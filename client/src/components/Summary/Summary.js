import { getTimeline, infinityNaNguard } from "utils";

export const Summary = ({ data }) => {
  const getMinMaxValues = () => {
    const minValue = data.reduce(
      (min, { value }) => Math.min(min, value),
      Infinity
    );
    const maxValue = data.reduce((max, { value }) => Math.max(max, value), 0);
    return { minValue, maxValue };
  };

  const sumOfAllMeasurements = (data) =>
    data.reduce((accumulator, current) => accumulator + current.value, 0);

  const minutesTotal = getTimeline(data).minutesTotal;
  const minValue = infinityNaNguard(getMinMaxValues(data).minValue);
  const maxValue = getMinMaxValues(data).maxValue;
  const missingDatapoints = minutesTotal - data.length;

  const averageBPM = infinityNaNguard(
    (sumOfAllMeasurements(data) / (minutesTotal - missingDatapoints)).toFixed(1)
  );

  const averageMeasurement = infinityNaNguard(
    minutesTotal / data.length
  ).toFixed(2);

  return (
    <div>
      <h3>Summary</h3>
      <p>Max value: {maxValue} BPM</p>
      <p>Min value: {minValue} BPM</p>
      <p>Avg value: {averageBPM} BPM</p>
      <p>{data.length} datapoints</p>
      <p>Avg measurement interval: {averageMeasurement} min</p>
    </div>
  );
};

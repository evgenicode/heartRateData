import { useMemo } from "react";
import { formattedTitle } from "utils";
import { formattedCSSClassName } from "utils";

export const MarksSleep = ({
  sleepData,
  xScale,
  yScale,
  xValue,
  coloredSleepStages,
}) => {
  const formattedSleepData = useMemo(() => {
    if (sleepData === undefined) {
      return [];
    }

    return sleepData.map((d) => ({
      ...d,
      startTime: new Date(d.startTime),
      endTime: new Date(d.endTime),
    }));
  }, [sleepData]);

  return formattedSleepData.map((d, i) => (
    <rect
      className={
        coloredSleepStages ? `${formattedCSSClassName(d.key)}` : "mark"
      }
      key={i}
      x={xScale(xValue(d))}
      y={0}
      width={xScale(d.endTime) - xScale(d.startTime)}
      height={yScale.range()[0]}
    >
      <title>{formattedTitle(d.key)}</title>
    </rect>
  ));
};

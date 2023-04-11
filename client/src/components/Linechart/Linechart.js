import React, { useMemo, useCallback } from "react";
import { scaleLinear, scaleTime, extent, min, max } from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { MarksHR } from "./MarksHR";
import { MarksSleep } from "./MarksSleep";
import { getTimeDifference } from "./getTimeDifference";
import { getTickFormat } from "./getTickFormat";

const margin = { top: 20, right: 30, bottom: 60, left: 65 };
const xAxisLabelOffset = 45;
const yAxisLabelOffset = 40;

export const Linechart = ({
  height,
  width,
  data,
  filteredData,
  brushExtent,
  userSelectedSleepData,
  filteredSleepData,
  sleepDataDisplayed,
}) => {
  const dynamicData = brushExtent ? filteredData : data;
  const dynamicSleepData = brushExtent
    ? filteredSleepData
    : userSelectedSleepData;

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = useCallback((d) => d.startTime, []);
  const xAxisLabel = getTimeDifference(dynamicData);

  const yValue = (d) => d.value;
  const yAxisLabel = "Heart Rate";

  const xAxisTickFormat = getTickFormat(dynamicData);

  const xScale = useMemo(() => {
    return scaleTime()
      .domain(extent(dynamicData, xValue))
      .range([0, innerWidth])
      .nice();
  }, [dynamicData, xValue, innerWidth]);

  const yMax = max(data, yValue) + 10;

  const yScale = useMemo(() => {
    return scaleLinear()
      .domain([min(data, yValue), yMax])
      .range([innerHeight, 0])
      .nice();
  }, [data, innerHeight, yMax]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={10}
          width={width}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset}, ${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={10} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          {xAxisLabel}
        </text>
        <>
          {sleepDataDisplayed === true ? (
            <MarksSleep
              sleepData={dynamicSleepData}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              yMax={yMax}
              margin={margin}
            />
          ) : (
            <></>
          )}
        </>

        <MarksHR
          data={dynamicData}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        />
      </g>
    </svg>
  );
};

import React from "react";
import { scaleLinear, scaleTime, extent, min, max } from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { getTimeDifference } from "./getTimeDifference";
import { getTickFormat } from "./getTickFormat";

const margin = { top: 20, right: 30, bottom: 60, left: 65 };
const xAxisLabelOffset = 45;
const yAxisLabelOffset = 40;

export const Linechart = ({ height, width, data, filteredData }) => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = (d) => d.startTime;
  const xAxisLabel = getTimeDifference(filteredData);

  const yValue = (d) => d.value;
  const yAxisLabel = "Heart Rate";

  const xAxisTickFormat = getTickFormat(filteredData);

  const xScale = scaleTime()
    .domain(extent(filteredData, xValue))
    .range([0, innerWidth])
    .nice();

  const yMax = max(data, yValue) + 10;

  const yScale = scaleLinear()
    .domain([min(data, yValue), yMax])
    .range([innerHeight, 0])
    .nice();

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
        <Marks
          data={filteredData}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
  );
};

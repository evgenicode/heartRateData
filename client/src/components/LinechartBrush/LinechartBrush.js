import React, { useRef, useEffect } from "react";
import { scaleLinear, scaleTime, timeFormat, extent, brushX, select } from "d3";

import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

const margin = { top: 20, right: 30, bottom: 60, left: 100 };
const xAxisLabelOffset = 45;
const yAxisLabelOffset = 40;

export const LinechartBrush = ({
  height,
  width,
  data,
  setBrushExtent,
  xValue,
}) => {
  const brushRef = useRef();

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xAxisLabel = "Time";

  const yValue = (d) => d.value;
  // const yAxisLabel = "Heart Rate";

  const xAxisTickFormat = timeFormat("%d %b");

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  useEffect(() => {
    const brush = brushX().extent([
      [0, 0],
      [innerWidth, innerHeight],
    ]);
    brush(select(brushRef.current));
    brush.on("brush end", (event) => {
      setBrushExtent(event.selection && event.selection.map(xScale.invert));
    });
  }, [innerWidth, innerHeight]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
          tickOffset={10}
        />
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset}, ${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {/* {yAxisLabel} */}
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
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
        />
        <g ref={brushRef} />
      </g>
    </svg>
  );
};

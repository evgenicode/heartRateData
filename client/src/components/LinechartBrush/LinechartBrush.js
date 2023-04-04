import React, { useRef, useEffect, useMemo } from "react";
import { scaleLinear, scaleTime, timeFormat, extent, brushX, select } from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

const margin = { top: 20, right: 30, bottom: 60, left: 60 };
const xAxisLabelOffset = 45;

const xAxisLabel = "Time";
const yValue = (d) => d.value;
const xAxisTickFormat = timeFormat("%d %b");

export const LinechartBrush = ({
  height,
  width,
  data,
  setBrushExtent,
  xValue,
}) => {
  const brushRef = useRef();

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = Math.max(0, width - margin.left - margin.right);

  const xScale = useMemo(() => {
    return scaleTime()
      .domain(extent(data, xValue))
      .range([0, innerWidth])
      .nice();
  }, [innerWidth, data, xValue]);

  const yScale = useMemo(() => {
    return scaleLinear()
      .domain(extent(data, yValue))
      .range([innerHeight, 0])
      .nice();
  }, [data, innerHeight]);

  useEffect(() => {
    const brush = brushX().extent([
      [0, 0],
      [innerWidth, innerHeight],
    ]);
    brush(select(brushRef.current));
    brush.on("brush end", (event) => {
      setBrushExtent(event.selection && event.selection.map(xScale.invert));
    });
  }, [innerWidth, innerHeight, setBrushExtent, xScale.invert]);

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
        />
        <g ref={brushRef} />
      </g>
    </svg>
  );
};

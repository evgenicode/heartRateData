import React, { useState, useEffect } from "react";
import { useData } from "./useData";
import { Linechart } from "components/Linechart/Linechart";
import { LinechartBrush } from "components/LinechartBrush/LinechartBrush";
import { Summary } from "components/Summary/Summary";
import { dataExtentFilter } from "utils";
import { DataDateFilter } from "./DataDateFilter";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

const LinechartBrushSize = 0.3;

const xValue = (d) => d.startTime;

export const HeartRateGraphView = () => {
  const data = useData();
  const [brushExtent, setBrushExtent] = useState();
  const [width, setWidth] = useState(1);
  const [dateExtent, setDateExtent] = useState();
  const [height, setHeight] = useState(500);

  useEffect(() => {
    const screenBreakPoint = 992;
    const container = document.querySelector(".linechart-container");

    if (container && data) {
      const desktopHeight = 500;
      const mobileHeight =
        window.orientation === 0
          ? window.innerHeight * 0.6
          : window.innerHeight * 1;

      const desktopOffset = 30;
      const mobileOffset = 20;
      setWidth(
        container.offsetWidth -
          (window.innerWidth >= screenBreakPoint ? desktopOffset : mobileOffset)
      );
      setHeight(
        window.innerWidth >= screenBreakPoint ? desktopHeight : mobileHeight
      );

      const handleResize = () => {
        setWidth(
          container.offsetWidth -
            (window.innerWidth >= screenBreakPoint
              ? desktopOffset
              : mobileOffset)
        );
        setHeight(
          window.innerWidth >= screenBreakPoint ? desktopHeight : mobileHeight
        );
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [data]);

  if (!data) {
    return (
      <Container fluid="lg">
        <div className="loader">
          <Spinner animation="border" variant="secondary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  const filteredData = dataExtentFilter(brushExtent, data, xValue);
  const userSelectedData = dataExtentFilter(dateExtent, data, xValue);

  return (
    <Container fluid="lg">
      <Row>
        <Col lg={9} className="linechart-container">
          <Card className="shadow  mb-5 bg-white rounded grey-text">
            <DataDateFilter
              data={data}
              setDateExtent={setDateExtent}
              dateExtent={dateExtent}
            />
            <svg width={width} height={height}>
              <Linechart
                data={userSelectedData}
                filteredData={filteredData}
                height={height - LinechartBrushSize * height}
                width={width}
                brushExtent={brushExtent}
              />
              <g
                transform={`translate(${0}, ${
                  height - LinechartBrushSize * height
                })`}
              >
                <LinechartBrush
                  xValue={xValue}
                  data={userSelectedData}
                  height={LinechartBrushSize * height}
                  width={width}
                  setBrushExtent={setBrushExtent}
                />
              </g>
            </svg>
            <Container fluid="lg">
              <Row>
                <Col lg={12}>
                  <h6 className="heart-rate-graph-footer">
                    Click and hold left mouse button on the graph above to
                    select specific time interval.
                  </h6>
                </Col>
              </Row>
            </Container>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="shadow p-3 mb-5 bg-white rounded">
            <Summary
              data={userSelectedData}
              filteredData={filteredData}
              brushExtent={brushExtent}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

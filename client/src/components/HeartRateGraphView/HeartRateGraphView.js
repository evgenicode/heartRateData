import React, { useState, useEffect } from "react";
import { useData } from "./useData";
import { Linechart } from "components/Linechart/Linechart";
import { LinechartBrush } from "components/LinechartBrush/LinechartBrush";
import { Summary } from "components/Summary/Summary";
import { dataExtentFilter } from "utils";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";

const LinechartBrushSize = 0.3;

const xValue = (d) => d.startTime;

const DataDateFilter = ({ data, setDateExtent }) => {
  const selectionFirstDate = data[0].startTime;
  const selectionLastDate = data[data.length - 1].startTime;

  const [startDate, setStartDate] = useState(selectionFirstDate);
  const [endDate, setEndDate] = useState(selectionLastDate);

  useEffect(() => {
    setDateExtent([startDate, endDate]);
  }, [startDate, endDate, setDateExtent]);

  const resetSelection = () => {
    setStartDate(selectionFirstDate);
    setEndDate(selectionLastDate);
  };

  return (
    <Container fluid="md">
      <Row className="graph-card-header">
        <Col md={12}>
          <h5>You can select the time frame period below:</h5>
        </Col>
      </Row>

      <Row className="datepicker-input">
        <Col md={4} className="datepicker-input-items">
          <div className="d-flex align-items-center">
            <span style={{ marginRight: "1%", whiteSpace: "nowrap" }}>
              Start date
            </span>
            <DatePicker
              dateFormat="dd MMM yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              includeDateIntervals={[
                {
                  start: subDays(selectionFirstDate, 1),
                  end: addDays(endDate, -1),
                },
              ]}
            />
          </div>
        </Col>
        <Col md={4} className="datepicker-input-items">
          <div className="d-flex align-items-center">
            <span style={{ marginRight: "1%", whiteSpace: "nowrap" }}>
              End date
            </span>
            <DatePicker
              dateFormat="dd MMM yyyy"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              includeDateIntervals={[
                {
                  start: subDays(startDate, 0),
                  end: addDays(selectionLastDate, 0),
                },
              ]}
            />
          </div>
        </Col>
        <Col md={4} className="datepicker-input-items">
          <Button
            className="reset-button"
            variant="secondary"
            size="sm"
            onClick={() => resetSelection()}
          >
            Reset Date Selection
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

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
    return <pre>Loading...</pre>;
  }

  const filteredData = brushExtent
    ? data.filter((item) => {
        const date = xValue(item);

        return date > brushExtent[0] && date < brushExtent[1];
      })
    : data;

  const userSelectedData = dateExtent
    ? data.filter((item) => {
        const date = xValue(item);
        return date > dateExtent[0] && date < dateExtent[1];
      })
    : data;

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

import React, { useState, useEffect } from "react";
import { useData } from "./useData";
import { Linechart } from "components/Linechart/Linechart";
import { LinechartBrush } from "components/LinechartBrush/LinechartBrush";
import { Summary } from "components/Summary/Summary";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const height = 500;
const LinechartBrushSize = 0.3;
const offset = 30;

const xValue = (d) => d.startTime;

const DataDateFilter = ({ data, setDateExtent, dateExtent }) => {
  const [startDate, setStartDate] = useState(data[0].startTime);
  const [endDate, setEndDate] = useState(data[data.length - 1].startTime);

  useEffect(() => {
    setDateExtent([startDate, endDate]);
  }, [startDate, endDate, setDateExtent]);

  return (
    <Container fluid="md">
      <Row>
        <Col md={12}>
          <h5>You can select the time frame period below:</h5>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <div className="d-flex align-items-center">
            <span style={{ marginRight: "1%", whiteSpace: "nowrap" }}>
              Start date
            </span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="d-flex align-items-center">
            <span style={{ marginRight: "1%", whiteSpace: "nowrap" }}>
              End date
            </span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
            />
          </div>
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

  useEffect(() => {
    const container = document.querySelector(".linechart-container");
    if (container && data) {
      setWidth(container.offsetWidth - offset);

      const handleResize = () => {
        setWidth(container.offsetWidth - offset);
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
    ? data.filter((d) => {
        const date = xValue(d);
        return date > brushExtent[0] && date < brushExtent[1];
      })
    : data;

  const userSelectedData = dateExtent
    ? data.filter((d) => {
        const date = xValue(d);
        return date > dateExtent[0] && date < dateExtent[1];
      })
    : data;

  return (
    <Container fluid="md">
      <Row>
        <Col md={9} className="linechart-container">
          <Card className="shadow  mb-5 bg-white rounded">
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
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow p-3 mb-5 bg-white rounded">
            <Summary data={filteredData} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

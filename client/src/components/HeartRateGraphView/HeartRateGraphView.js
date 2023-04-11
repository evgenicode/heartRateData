import React, { useState, useEffect, useMemo } from "react";
import { useData } from "./useData";
import { Linechart } from "components/Linechart/Linechart";
import { LinechartBrush } from "components/LinechartBrush/LinechartBrush";
import { SummaryHeartRate } from "components/Summary/SummaryHeartRate";
import { SummarySleep } from "components/Summary/SummarySleep";
import { dataExtentFilter } from "utils";
import { DataDateFilter } from "./DataDateFilter";
import { getSleepData } from "services/healthData";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

const LinechartBrushSize = 0.3;

const xValue = (d) => d.startTime;

export const HeartRateGraphView = () => {
  const data = useData();
  const [brushExtent, setBrushExtent] = useState();
  const [width, setWidth] = useState(0);
  const [dateExtent, setDateExtent] = useState();
  const [height, setHeight] = useState(500);
  const [sleepData, setSleepData] = useState(null);
  const [sleepDataRequested, setSleepDataRequested] = useState(false);
  const [sleepDataDisplayed, setSleepDataDisplayed] = useState(false);

  const loadSleepData = () => {
    setSleepDataRequested(true);

    getSleepData()
      .then((data) =>
        data.map((item) => ({
          startTime: new Date(item.startTime),
          endTime: new Date(item.endTime),
          key: String(item.key),
        }))
      )
      .then((formattedData) => {
        setSleepData(formattedData);
      });
  };

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

  // TODO: test for bugs. Code below crashes if not memoized&declared before data null check
  const userSelectedData = useMemo(() => {
    if (data === null) {
      return;
    }
    return dataExtentFilter(dateExtent, data, xValue);
  }, [dateExtent, data]);

  const filteredData = useMemo(() => {
    if (data === null) {
      return;
    }
    return dataExtentFilter(brushExtent, data, xValue);
  }, [brushExtent, data]);
  // TODO: test for bugs. Code above crashes if not memoized&declared before data null check

  const userSelectedSleepData = useMemo(() => {
    if (sleepData === null) {
      return;
    }
    return dataExtentFilter(dateExtent, sleepData, xValue);
  }, [dateExtent, sleepData]);

  const filteredSleepData = useMemo(() => {
    if (sleepData === null) {
      return;
    }
    return dataExtentFilter(brushExtent, sleepData, xValue);
  }, [brushExtent, sleepData]);

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

  const sleepDataButtonText = () => {
    return sleepDataDisplayed === false ? "Show sleep data" : "Hide sleep data";
  };

  const handleSleepButtonClick = () => {
    setSleepDataDisplayed(!sleepDataDisplayed);
  };

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
                userSelectedSleepData={userSelectedSleepData}
                filteredSleepData={filteredSleepData}
                sleepDataDisplayed={sleepDataDisplayed}
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
              <Row>
                <Col md={4}></Col>
                <Col md={4}></Col>

                <Col md={4}>
                  <div className="graph-buttons">
                    {sleepData === null ? (
                      <div></div>
                    ) : (
                      <Button
                        className="reset-button"
                        variant="secondary"
                        size="sm"
                        onClick={() => handleSleepButtonClick()}
                      >
                        {sleepDataButtonText()}
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </Container>
          </Card>
        </Col>
        <Col lg={3}>
          <Card className="shadow p-3 mb-5 bg-white rounded">
            <SummaryHeartRate
              data={userSelectedData}
              filteredData={filteredData}
              brushExtent={brushExtent}
            />
          </Card>
          <Card className="shadow p-3 mb-5 bg-white rounded">
            <SummarySleep
              sleepData={sleepData}
              sleepDataRequested={sleepDataRequested}
              setSleepDataRequested={setSleepDataRequested}
              loadSleepData={loadSleepData}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

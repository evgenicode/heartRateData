import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import ReactSlider from "react-slider";

export const DataDateFilter = ({ data, setDateExtent }) => {
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

  const MultiRangeSlider = () => {
    const [values, setValues] = useState([startDate, endDate]);
    const [isBeingDragged, setBeingDragged] = useState(false);

    const handleThumbChange = (thumb) => {
      setValues(thumb);
      setBeingDragged(true);
    };

    const handleThumbRelease = (thumb) => {
      setStartDate(new Date(thumb[0]));
      setEndDate(new Date(thumb[1]));
      setBeingDragged(false);
    };

    return (
      <div>
        <ReactSlider
          className="horizontal-slider"
          thumbClassName="thumb"
          trackClassName="track"
          value={values}
          ariaLabel={["Lower thumb", "Upper thumb"]}
          ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
          renderThumb={(props, state) => (
            <div {...props}>
              <div className="thumb-value">
                {isBeingDragged && new Date(state.valueNow).toDateString()}
              </div>
            </div>
          )}
          pearling
          min={data[0].startTime.getTime()}
          max={data[data.length - 1].startTime.getTime()}
          onChange={handleThumbChange}
          onAfterChange={handleThumbRelease}
        />
      </div>
    );
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

      <Row>
        <Col>
          <MultiRangeSlider />
        </Col>
      </Row>
    </Container>
  );
};

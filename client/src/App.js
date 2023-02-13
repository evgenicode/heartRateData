import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { HeartRateGraphView } from "./components/HeartRateGraphView/HeartRateGraphView";

function App() {
  return (
    <div className="App">
      <Container fluid="md">
        <Row>
          <Col>
            <h2>
              This app displays a sample dataset captured by a Huawei wristband.
            </h2>
            <p>
              You can select a <i>specific time interval</i> on the bottom graph
              by clicking and holding the left button on your mouse.
            </p>
          </Col>
        </Row>
        <Row>
          <HeartRateGraphView />
        </Row>
      </Container>
    </div>
  );
}

export default App;

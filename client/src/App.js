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
            <h2 className="app-header">
              This app displays a sample dataset captured with a wristband.
            </h2>
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

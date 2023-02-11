import React from "react";

import { HeartRateGraphView } from "./components/HeartRateGraphView/HeartRateGraphView";

function App() {
  return (
    <div className="App">
      <div className="description-paragraph">
        <h2 className="centered">
          This app displays a sample dataset captured by a Huawei wristband.
        </h2>
        <p className="centered">
          You can select a <i>specific time interval</i> on the bottom graph by
          clicking and holding the left button on your mouse.
        </p>
      </div>

      <HeartRateGraphView />
    </div>
  );
}

export default App;

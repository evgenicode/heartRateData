import ReactSlider from "react-slider";
import { useState } from "react";

export const MultiRangeSlider = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(500);

  return (
    <div>
      <ReactSlider
        className="horizontal-slider"
        thumbClassName="thumb"
        trackClassName="track"
        defaultValue={[0, 100]}
        ariaLabel={["Lower thumb", "Upper thumb"]}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        renderThumb={(props) => <div {...props}></div>}
        pearling
        minDistance={10}
      />
    </div>
  );
};

//////////////component with
/* <div>
  <ReactSlider
    className="horizontal-slider"
    thumbClassName="thumb"
    trackClassName="example-track"
    defaultValue={[0, 100]}
    ariaLabel={["Lower thumb", "Upper thumb"]}
    ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    pearling
    minDistance={10}
  />
</div>; */

// import React, { useState, useEffect } from "react";
// import { useData } from "./useData";
// import { Linechart } from "components/Linechart/Linechart";
// import { LinechartBrush } from "components/LinechartBrush/LinechartBrush";
// import { Summary } from "components/Summary/Summary";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

// const width = 900;
// const height = 500;
// const LinechartBrushSize = 0.3;

// const xValue = (d) => d.startTime;

// export const HeartRateGraphView = () => {
//   const data = useData();
//   const [brushExtent, setBrushExtent] = useState();

//   if (!data) {
//     return <pre>Loading...</pre>;
//   }

//   const filteredData = brushExtent
//     ? data.filter((d) => {
//         const date = xValue(d);
//         return date > brushExtent[0] && date < brushExtent[1];
//       })
//     : data;

//   return (
//     <Container fluid="md">
//       <Row>
//         <Col sm={8} className="col">
//           <svg width={width} height={height}>
//             <Linechart
//               data={data}
//               filteredData={filteredData}
//               height={height - LinechartBrushSize * height}
//               width={width}
//             />
//             <g
//               transform={`translate(${0}, ${
//                 height - LinechartBrushSize * height
//               })`}
//             >
//               <LinechartBrush
//                 xValue={xValue}
//                 data={data}
//                 height={LinechartBrushSize * height}
//                 width={width}
//                 setBrushExtent={setBrushExtent}
//               />
//             </g>
//           </svg>
//         </Col>
//         <Col sm={4}>
//           <Summary data={filteredData} />
//         </Col>
//       </Row>
//     </Container>
//   );
// };

/// recent
import React, { useState, useEffect } from "react";
import { useData } from "./useData";
import { Linechart } from "components/Linechart/Linechart";
import { LinechartBrush } from "components/LinechartBrush/LinechartBrush";
import { Summary } from "components/Summary/Summary";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const height = 500;
const LinechartBrushSize = 0.3;
const offset = 30;

const xValue = (d) => d.startTime;

export const HeartRateGraphView = () => {
  const data = useData();
  const [brushExtent, setBrushExtent] = useState();
  const [width, setWidth] = useState(1);

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

  return (
    <Container fluid="md">
      <Row>
        <Col md={9} className="linechart-container">
          <Card className="shadow  mb-5 bg-white rounded">
            <svg width={width} height={height}>
              <Linechart
                data={data}
                filteredData={filteredData}
                height={height - LinechartBrushSize * height}
                width={width}
              />
              <g
                transform={`translate(${0}, ${
                  height - LinechartBrushSize * height
                })`}
              >
                <LinechartBrush
                  xValue={xValue}
                  data={data}
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

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { formattedTitle } from "utils";
import { formattedCSSClassName } from "utils";

export const SummarySleep = ({
  loadSleepData,
  sleepDataRequested,
  sleepData,
  brushExtent,
  filteredSleepData,
  setColoredSleepStages,
  coloredSleepStages,
}) => {
  const dynamicData = brushExtent ? filteredSleepData : sleepData;

  const getSleepStagesFromData = (data) => {
    if (data === null) {
      return [];
    }
    const sleepStages = new Set();

    data.forEach((d) => {
      sleepStages.add(d.key);
    });

    return [...sleepStages];
  };

  const sleepStagesArray = getSleepStagesFromData(sleepData);

  const handleSleepButtonClick = () => {
    setColoredSleepStages(!coloredSleepStages);
  };

  if (sleepData === null) {
    return (
      <div className="grey-text">
        <h3>Sleep Summary</h3>

        <Button
          className="reset-button"
          variant="secondary"
          size="sm"
          onClick={() => loadSleepData()}
        >
          {sleepDataRequested === false ? (
            "Get Sleep Data"
          ) : (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />{" "}
              Loading...
            </>
          )}
        </Button>
      </div>
    );
  } else {
    return (
      <div className="grey-text">
        <h3>Sleep Summary</h3>
        <p>{dynamicData.length} datapoints</p>
        {coloredSleepStages && (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {sleepStagesArray.map((stage) => (
              <div
                key={stage}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  className={`rounded-squares ${formattedCSSClassName(stage)}`}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "5px",
                  }}
                ></div>
                <div>{formattedTitle(stage)}</div>
              </div>
            ))}
          </div>
        )}
        <br />
        <Button
          className="reset-button"
          variant="secondary"
          size="sm"
          onClick={() => handleSleepButtonClick()}
        >
          Toggle Sleep Stage Colors
        </Button>
      </div>
    );
  }
};

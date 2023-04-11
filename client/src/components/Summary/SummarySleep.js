import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

export const SummarySleep = ({
  loadSleepData,
  sleepDataRequested,
  sleepData,
}) => {
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

        <p>Data goes here</p>
      </div>
    );
  }
};
